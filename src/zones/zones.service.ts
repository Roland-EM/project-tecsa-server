import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zone, ZoneDocument } from './schemas/zone.schema';
import { CreateZoneDto } from './dto/create-zone.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone.name) private zoneModel: Model<ZoneDocument>,
  ) {}

  async create(createZoneDto: CreateZoneDto, userId: string): Promise<Zone> {
    // Business rule: zones can only be created inside groups
    if (createZoneDto.type === 'zone' && createZoneDto.parentId) {
      const parent = await this.zoneModel.findOne({ id: createZoneDto.parentId });
      if (!parent || parent.type !== 'group') {
        throw new BadRequestException('Zones can only be created inside groups');
      }
    }

    const zone = new this.zoneModel({
      ...createZoneDto,
      createdBy: userId,
    });

    const savedZone = await zone.save();

    // Update parent's children array
    if (createZoneDto.parentId) {
      await this.zoneModel.findOneAndUpdate(
        { id: createZoneDto.parentId },
        { $push: { children: savedZone.id } },
      );
    }

    return savedZone;
  }

  async findAll(): Promise<Zone[]> {
    return this.zoneModel.find().exec();
  }

  async findOne(id: string): Promise<Zone> {
    const zone = await this.zoneModel.findOne({ id }).exec();
    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
    return zone;
  }

  async findByParent(parentId: string): Promise<Zone[]> {
    return this.zoneModel.find({ parentId }).exec();
  }

  async getRootZones(): Promise<Zone[]> {
    return this.zoneModel.find({ parentId: { $exists: false } }).exec();
  }

  async getHierarchy(): Promise<any[]> {
    const zones = await this.zoneModel.find().exec();
    const buildHierarchy = (parentId?: string) => {
      return zones
        .filter(zone => zone.parentId === parentId)
        .map(zone => ({
          ...zone.toObject(),
          children: buildHierarchy(zone.id),
        }));
    };

    return buildHierarchy();
  }

  async update(id: string, updateZoneDto: Partial<CreateZoneDto>): Promise<Zone> {
    const zone = await this.zoneModel.findOneAndUpdate(
      { id },
      updateZoneDto,
      { new: true },
    ).exec();

    if (!zone) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }

    return zone;
  }

  async remove(id: string): Promise<void> {
    const zone = await this.findOne(id);
    
    // Remove from parent's children array
    if (zone.parentId) {
      await this.zoneModel.findOneAndUpdate(
        { id: zone.parentId },
        { $pull: { children: id } },
      );
    }

    // Remove all children (recursive)
    for (const childId of zone.children) {
      await this.remove(childId);
    }

    const result = await this.zoneModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Zone with id ${id} not found`);
    }
  }
}