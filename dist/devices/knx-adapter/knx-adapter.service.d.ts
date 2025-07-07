import { Device } from '../schemas/device.schema';
import { DeviceCommandDto } from '../dto/device-command.dto';
import { IAdapter } from '../adapters/adapter.interface';
export declare class KnxAdapterService implements IAdapter {
    private connections;
    sendCommand(device: Device, command: DeviceCommandDto): Promise<any>;
    getStatus(device: Device): Promise<any>;
    connect(config: any): Promise<void>;
    disconnect(): Promise<void>;
}
