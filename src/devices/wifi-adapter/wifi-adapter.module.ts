import { Module } from '@nestjs/common';
import { WifiAdapterService } from './wifi-adapter.service';

@Module({
  providers: [WifiAdapterService],
  exports: [WifiAdapterService],
})
export class WifiAdapterModule {}