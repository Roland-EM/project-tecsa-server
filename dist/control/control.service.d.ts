import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '@core/enums/role.enum';
export declare class ControlService {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    getAllUsers(): Promise<any[]>;
    resetUserPassword(userId: string, newPassword: string): Promise<any>;
    changeUserRole(userId: string, role: Role): Promise<any>;
    deactivateUser(userId: string): Promise<any>;
    activateUser(userId: string): Promise<any>;
    getAuditLogs(): Promise<any[]>;
}
