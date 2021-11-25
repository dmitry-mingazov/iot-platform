import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/devices', {
      connectionName: 'devices',
    }),
    MongooseModule.forRoot('mongodb://localhost/devicesTest', {
      connectionName: 'devicesTest',
    }),
    DevicesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
