import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from '../src/schemas/device.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const exCreateDevDto = {
    name: 'testDevice',
    devtype: 'ActuatingDevice',
    services: [
      {
        endpoint: 'test.endpoint',
        interfaceType: 'black magic',
        metadata: {
          metadataType: 'magic word',
          value: 'abracadabra',
        },
      },
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature(
          [{ name: Device.name, schema: DeviceSchema }],
          'devicesTest',
        ),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/devices (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/devices')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        if (res.body.length > 0)
          expect(res.body[0]).toMatchObject(new Device());
      });
  });

  it('/api/devices (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/devices')
      .send(exCreateDevDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(new Device());
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
