import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Layout, LayoutDocument, CardInstance } from './schemas/layout.schema';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { AddCardInstanceDto } from './dto/add-card-instance.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LayoutsService {
  constructor(
    @InjectModel(Layout.name) private layoutModel: Model<LayoutDocument>,
  ) {}

  async findUserLayouts(userId: string, page?: string, zoneId?: string): Promise<Layout[]> {
    const filter: any = { userId };
    if (page) filter.page = page;
    if (zoneId) filter.zoneId = zoneId;

    const layouts = await this.layoutModel.find(filter).exec();
    return layouts.map(layout => layout.toObject());
  }

  async createLayout(createLayoutDto: CreateLayoutDto): Promise<LayoutDocument> {
    const layout = new this.layoutModel(createLayoutDto);
    return layout.save();
  }

  async addCardInstance(
    userId: string,
    page: string,
    zoneId: string | undefined,
    addCardInstanceDto: AddCardInstanceDto,
  ): Promise<Layout> {
    const cardInstance: CardInstance = {
      cardInstanceId: uuidv4(),
      ...addCardInstanceDto,
    };

    const existingLayout = await this.layoutModel.findOne({ userId, page, zoneId });
    let layout: LayoutDocument;
    
    if (!existingLayout) {
      layout = await this.createLayout({ userId, page, zoneId, cardInstances: [cardInstance] });
    } else {
      layout = existingLayout;
      layout.cardInstances.push(cardInstance);
      await layout.save();
    }

    return layout.toObject();
  }

  async removeCardInstance(
    userId: string,
    page: string,
    cardInstanceId: string,
    zoneId?: string,
  ): Promise<Layout> {
    const layout = await this.layoutModel.findOne({ userId, page, zoneId });
    
    if (!layout) {
      throw new NotFoundException('Layout not found');
    }

    layout.cardInstances = layout.cardInstances.filter(
      (card) => card.cardInstanceId !== cardInstanceId,
    );
    
    const savedLayout = await layout.save();
    return savedLayout.toObject();
  }

  async updateCardInstance(
    userId: string,
    page: string,
    cardInstanceId: string,
    updateData: Partial<CardInstance>,
    zoneId?: string,
  ): Promise<Layout> {
    const layout = await this.layoutModel.findOne({ userId, page, zoneId });
    
    if (!layout) {
      throw new NotFoundException('Layout not found');
    }

    const cardIndex = layout.cardInstances.findIndex(
      (card) => card.cardInstanceId === cardInstanceId,
    );

    if (cardIndex === -1) {
      throw new NotFoundException('Card instance not found');
    }

    layout.cardInstances[cardIndex] = {
      ...layout.cardInstances[cardIndex],
      ...updateData,
    };

    const savedLayout = await layout.save();
    return savedLayout.toObject();
  }

  async deleteLayout(userId: string, page: string, zoneId?: string): Promise<void> {
    const result = await this.layoutModel.deleteOne({ userId, page, zoneId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Layout not found');
    }
  }
}