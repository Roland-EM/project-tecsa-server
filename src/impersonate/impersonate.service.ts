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
    console.log(`Impersonation request - moderator: ${moderatorId}, target: ${targetUserId}`);
    
    const moderator = await this.usersService.findOne(moderatorId);
    const targetUser = await this.usersService.findOne(targetUserId);

    if (!moderator || !targetUser) {
      const missingUser = !moderator ? 'moderator' : 'target user';
      throw new NotFoundException(`${missingUser} not found`);
    }

    console.log(`Moderator role: ${moderator.role}, Target role: ${targetUser.role}`);

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

    console.log(`Impersonation successful - token generated for ${targetUser.username}`);
    
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
    console.log(`Stopping impersonation for user ID: ${moderatorId}`);
    
    try {
      const moderator = await this.usersService.findOne(moderatorId);
    
      if (!moderator) {
        throw new NotFoundException(`User with id ${moderatorId} not found`);
      }

      console.log(`Found moderator: ${moderator.username}, generating refresh token`);
      return this.authService.refresh(moderator);
    } catch (error) {
      console.error(`Error stopping impersonation: ${error.message}`);
      throw error;
    }
  }
}