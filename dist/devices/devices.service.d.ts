import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceCommandDto } from './dto/device-command.dto';
import { AdaptersService } from './adapters/adapters.service';
export declare class DevicesService {
    private deviceModel;
    private readonly adaptersService;
    constructor(deviceModel: Model<DeviceDocument>, adaptersService: AdaptersService);
    create(createDeviceDto: CreateDeviceDto): Promise<Device>;
    findAll(): Promise<Device[]>;
    findOne(id: string): Promise<Device>;
    findByZone(zoneId: string): Promise<Device[]>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device>;
    remove(id: string): Promise<void>;
    sendCommand(id: string, command: DeviceCommandDto): Promise<any>;
    updateStatus(id: string, status: any): Promise<Device>;
}
