import { Device } from '../schemas/device.schema';
import { DeviceCommandDto } from '../dto/device-command.dto';
import { KnxAdapterService } from '../knx-adapter/knx-adapter.service';
import { WifiAdapterService } from '../wifi-adapter/wifi-adapter.service';
export declare class AdaptersService {
    private readonly knxAdapter;
    private readonly wifiAdapter;
    constructor(knxAdapter: KnxAdapterService, wifiAdapter: WifiAdapterService);
    sendCommand(device: Device, command: DeviceCommandDto): Promise<any>;
    getStatus(device: Device): Promise<any>;
}
