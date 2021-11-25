import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices.module';

@Module({
  imports: [
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
