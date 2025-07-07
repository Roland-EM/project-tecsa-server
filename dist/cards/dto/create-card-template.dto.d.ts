import { Role } from '@core/enums/role.enum';
export declare class CreateCardTemplateDto {
    templateId: string;
    name: string;
    category: string;
    minRole?: Role;
    size: {
        x: number;
        y: number;
    };
    icon?: string;
    description?: string;
    defaultSettings?: any;
    supportedDeviceTypes?: string[];
}
