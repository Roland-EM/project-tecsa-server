import { Injectable } from '@nestjs/common';
import { Role } from '@core/enums/role.enum';

@Injectable()
export class RolesService {
  getRoles(): Role[] {
    return Object.values(Role);
  }

  getRoleHierarchy(): Record<Role, Role[]> {
    return {
      [Role.OWNER]: [Role.OWNER, Role.ADMIN, Role.PREMIUM, Role.NORMAL],
      [Role.ADMIN]: [Role.ADMIN, Role.PREMIUM, Role.NORMAL],
      [Role.PREMIUM]: [Role.PREMIUM, Role.NORMAL],
      [Role.NORMAL]: [Role.NORMAL],
    };
  }

  canAccessRole(userRole: Role, targetRole: Role): boolean {
    const hierarchy = this.getRoleHierarchy();
    return hierarchy[userRole]?.includes(targetRole) || false;
  }

  getPermissions(role: Role): string[] {
    const permissions = {
      [Role.OWNER]: ['*'],
      [Role.ADMIN]: ['users:read', 'users:write', 'devices:*', 'layouts:*', 'zones:*'],
      [Role.PREMIUM]: ['devices:read', 'devices:command', 'layouts:*', 'zones:read'],
      [Role.NORMAL]: ['devices:read', 'layouts:read', 'zones:read'],
    };

    return permissions[role] || [];
  }
}