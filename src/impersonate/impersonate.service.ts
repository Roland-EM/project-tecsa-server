import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { Role } from '@core/enums/role.enum';

@Injectable()
export class ImpersonateService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async impersonateUser(moderatorId: string, targetUserId: string): Promise<any> {
    const moderator = await this.usersService.findOne(moderatorId);
    const targetUser = await this.usersService.findOne(targetUserId);

    if (!moderator || !targetUser) {
      throw new NotFoundException('User not found');
    }

    // Only owners and admins can impersonate
    if (moderator.role !== Role.OWNER && moderator.role !== Role.ADMIN) {
      throw new UnauthorizedException('Insufficient permissions to impersonate');
    }

    // Cannot impersonate users with higher or equal roles
    const roleHierarchy = [Role.NORMAL, Role.PREMIUM, Role.ADMIN, Role.OWNER];
    const moderatorRoleIndex = roleHierarchy.indexOf(moderator.role);
    const targetRoleIndex = roleHierarchy.indexOf(targetUser.role);

    if (targetRoleIndex >= moderatorRoleIndex) {
      throw new UnauthorizedException('Cannot impersonate user with higher or equal role');
    }

    // Generate impersonation token
    const impersonationToken = await this.authService.refresh(targetUser);

    return {
      ...impersonationToken,
      impersonated: true,
      originalUser: {
        id: moderator.id,
        username: moderator.username,
        role: moderator.role,
      },
      targetUser: {
        id: targetUser.id,
        username: targetUser.username,
        role: targetUser.role,
      },
    };
  }

  async stopImpersonation(moderatorId: string): Promise<any> {
    const moderator = await this.usersService.findOne(moderatorId);
    
    if (!moderator) {
      throw new NotFoundException('User not found');
    }

    return this.authService.refresh(moderator);
  }
}