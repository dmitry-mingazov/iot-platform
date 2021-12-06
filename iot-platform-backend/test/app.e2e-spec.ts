import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from '../src/schemas/device.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const exCreateDevDto = {
    name: 'testDevice',
    userId: 'id',
    description: 'description',
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

  let configService;
  let devId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule,
        MongooseModule.forFeature(
          [{ name: Device.name, schema: DeviceSchema }],
          'devicesTest',
        ),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    configService = moduleFixture.get<ConfigService>(ConfigService);
    await request(app.getHttpServer())
      .post('/api/devices')
      .set('Authorization', 'Bearer ' + configService.get('TEST_TOKEN'))
      .send(exCreateDevDto)
      .then((res) => {
        devId = res.body['_id'];
      });
  });

  it('/api/devices (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/devices')
      .set('Authorization', 'Bearer ' + configService.get('TEST_TOKEN'))
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
        if (res.body.length > 0)
          expect(res.body[0]).toMatchObject(new Device());
      });
  });

  it('/api/devices/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/devices/' + devId)
      .set('Authorization', 'Bearer ' + configService.get('TEST_TOKEN'))
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(new Device());
      });
  });

  it('/api/devices (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/devices')
      .set('Authorization', 'Bearer ' + configService.get('TEST_TOKEN'))
      .send(exCreateDevDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toMatchObject(new Device());
      });
  });

  it('/api/devices (GET) should fail if not authenticated', () => {
    return request(app.getHttpServer()).get('/api/devices').expect(401);
  });

  it('/api/devices/:id (GET) should fail if not authenticated', () => {
    return request(app.getHttpServer()).get('/api/devices/42').expect(401);
  });

  it('/api/devices (POST) should fail if not authenticated', () => {
    return request(app.getHttpServer())
      .post('/api/devices')
      .send(exCreateDevDto)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
