import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
