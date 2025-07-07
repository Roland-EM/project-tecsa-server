import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LayoutsService } from './layouts.service';
import { LayoutsController } from './layouts.controller';
import { Layout, LayoutSchema } from './schemas/layout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Layout.name, schema: LayoutSchema }]),
  ],
  controllers: [LayoutsController],
  providers: [LayoutsService],
  exports: [LayoutsService],
})
export class LayoutsModule {}