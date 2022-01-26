import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_URL}/devices`, {
      connectionName: 'devices',
    }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}/devicesTest`, {
      connectionName: 'devicesTest',
    }),
    DevicesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
