import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceCommandDto } from './dto/device-command.dto';
export declare class DevicesController {
    private readonly devicesService;
    constructor(devicesService: DevicesService);
    create(createDeviceDto: CreateDeviceDto): Promise<import("./schemas/device.schema").Device>;
    findAll(zoneId?: string): Promise<import("./schemas/device.schema").Device[]>;
    findOne(id: string): Promise<import("./schemas/device.schema").Device>;
    update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<import("./schemas/device.schema").Device>;
    remove(id: string): Promise<void>;
    sendCommand(id: string, command: DeviceCommandDto): Promise<any>;
}
