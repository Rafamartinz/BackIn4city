import { Module } from '@nestjs/common';

/* import { EnvironmentalModule } from './environmental/environmental.module'; */
import { TrafficModule } from './traffic/traffic.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices/devices.module';
import { EnvironmentalModule } from './environmental/environmental.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/in4city'),
    AuthModule,
    SeedModule,
    DevicesModule,
    EnvironmentalModule,
    TrafficModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
