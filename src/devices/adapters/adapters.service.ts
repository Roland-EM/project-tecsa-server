import { Injectable } from '@nestjs/common';
import { Device } from '../schemas/device.schema';
import { DeviceCommandDto } from '../dto/device-command.dto';
import { KnxAdapterService } from '../knx-adapter/knx-adapter.service';
import { WifiAdapterService } from '../wifi-adapter/wifi-adapter.service';

@Injectable()
export class AdaptersService {
  constructor(
    private readonly knxAdapter: KnxAdapterService,
    private readonly wifiAdapter: WifiAdapterService,
  ) {}

  async sendCommand(device: Device, command: DeviceCommandDto): Promise<any> {
    switch (device.protocol.toLowerCase()) {
      case 'knx':
        return this.knxAdapter.sendCommand(device, command);
      case 'wifi':
        return this.wifiAdapter.sendCommand(device, command);
      default:
        throw new Error(`Unsupported protocol: ${device.protocol}`);
    }
  }

  async getStatus(device: Device): Promise<any> {
    switch (device.protocol.toLowerCase()) {
      case 'knx':
        return this.knxAdapter.getStatus(device);
      case 'wifi':
        return this.wifiAdapter.getStatus(device);
      default:
        throw new Error(`Unsupported protocol: ${device.protocol}`);
    }
  }
}