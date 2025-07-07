import { Role } from '@core/enums/role.enum';
export declare class CreateUserDto {
    id: string;
    username: string;
    password: string;
    role?: Role;
    email: string;
    phone?: string;
    theme?: string;
    isActive?: boolean;
}
