import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { ConfigService } from './core/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: configService.mongoUri,
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