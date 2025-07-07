import { ControlService } from './control.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '@core/enums/role.enum';
export declare class ControlController {
    private readonly controlService;
    constructor(controlService: ControlService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    getAllUsers(): Promise<any[]>;
    resetUserPassword(id: string, body: {
        password: string;
    }): Promise<any>;
    changeUserRole(id: string, body: {
        role: Role;
    }): Promise<any>;
    deactivateUser(id: string): Promise<any>;
    activateUser(id: string): Promise<any>;
    getAuditLogs(): Promise<any[]>;
}
