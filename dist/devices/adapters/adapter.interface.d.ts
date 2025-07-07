import { Device } from '../schemas/device.schema';
import { DeviceCommandDto } from '../dto/device-command.dto';
export interface IAdapter {
    sendCommand(device: Device, command: DeviceCommandDto): Promise<any>;
    getStatus(device: Device): Promise<any>;
    connect(config: any): Promise<void>;
    disconnect(): Promise<void>;
}
