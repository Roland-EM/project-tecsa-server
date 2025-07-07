import { Module } from '@nestjs/common';
import { AdaptersService } from './adapters.service';
import { KnxAdapterModule } from '../knx-adapter/knx-adapter.module';
import { WifiAdapterModule } from '../wifi-adapter/wifi-adapter.module';

@Module({
  imports: [KnxAdapterModule, WifiAdapterModule],
  providers: [AdaptersService],
  exports: [AdaptersService],
})
export class AdaptersModule {}