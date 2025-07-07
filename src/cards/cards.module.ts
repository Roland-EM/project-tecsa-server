import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardTemplate, CardTemplateSchema } from './schemas/card-template.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CardTemplate.name, schema: CardTemplateSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}