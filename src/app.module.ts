import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService as NestConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { DevicesModule } from './devices/devices.module';
import { CardsModule } from './cards/cards.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ZonesModule } from './zones/zones.module';
import { ControlModule } from './control/control.module';
import { ThemeModule } from './theme/theme.module';
import { ImpersonateModule } from './impersonate/impersonate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [NestConfigService],
      useFactory: async (configService: NestConfigService): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGO_URI'),
        serverSelectionTimeoutMS: 5000, // Reduce timeout for faster feedback during connection issues
      }),
    }),
    CoreModule,
    AuthModule,
    UsersModule,
    RolesModule,
    DevicesModule,
    CardsModule,
    LayoutsModule,
    ZonesModule,
    ControlModule,
    ThemeModule,
    ImpersonateModule,
  ],
})
export class AppModule {}