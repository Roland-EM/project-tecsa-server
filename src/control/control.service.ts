import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '@core/enums/role.enum';

@Injectable()
export class ControlService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }

  async getAllUsers(): Promise<any[]> {
    return this.usersService.findAll();
  }

  async resetUserPassword(userId: string, newPassword: string): Promise<any> {
    return this.usersService.update(userId, { password: newPassword });
  }

  async changeUserRole(userId: string, role: Role): Promise<any> {
    return this.usersService.update(userId, { role });
  }

  async deactivateUser(userId: string): Promise<any> {
    return this.usersService.update(userId, { isActive: false });
  }

  async activateUser(userId: string): Promise<any> {
    return this.usersService.update(userId, { isActive: true });
  }

  // Audit logs placeholder
  async getAuditLogs(): Promise<any[]> {
    // This would be implemented with a proper audit log system
    return [];
  }
}