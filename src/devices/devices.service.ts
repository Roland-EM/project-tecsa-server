import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceCommandDto } from './dto/device-command.dto';
import { AdaptersService } from './adapters/adapters.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    private readonly adaptersService: AdaptersService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = new this.deviceModel(createDeviceDto);
    return device.save();
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async findOne(id: string): Promise<Device> {
    const device = await this.deviceModel.findOne({ id }).exec();
    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }
    return device;
  }

  async findByZone(zoneId: string): Promise<Device[]> {
    return this.deviceModel.find({ zoneId }).exec();
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.deviceModel.findOneAndUpdate(
      { id },
      updateDeviceDto,
      { new: true },
    ).exec();

    if (!device) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }

    return device;
  }

  async remove(id: string): Promise<void> {
    const result = await this.deviceModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Device with id ${id} not found`);
    }
  }

  async sendCommand(id: string, command: DeviceCommandDto): Promise<any> {
    const device = await this.findOne(id);
    return this.adaptersService.sendCommand(device, command);
  }

  async updateStatus(id: string, status: any): Promise<Device> {
    return this.update(id, { data: { ...status } });
  }
}