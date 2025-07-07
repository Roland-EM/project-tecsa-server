import { Module } from '@nestjs/common';
import { ImpersonateService } from './impersonate.service';
import { ImpersonateController } from './impersonate.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [ImpersonateController],
  providers: [ImpersonateService],
})
export class ImpersonateModule {}