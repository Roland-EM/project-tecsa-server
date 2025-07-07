import { Module } from '@nestjs/common';
import { KnxAdapterService } from './knx-adapter.service';

@Module({
  providers: [KnxAdapterService],
  exports: [KnxAdapterService],
})
export class KnxAdapterModule {}