import { Test } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device, DeviceSchema } from './schemas/device.schema';
import { AppModule } from './app.module';
import { DevicesModule } from './devices.module';
import { Connection } from 'mongoose';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';

describe(DevicesController, () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;
  let connectiondev: Connection;
  let connectiontest: Connection;
  const exDevArray: Device[] = [
    {
      name: 'testDevice',
      devtype: 'ActuatingDevice',
      userId: 'magic-user',
      services: [
        {
          endpoint: 'test.endpoint',
          interfaceType: 'black magic',
          metadata: [
            {
              metadataType: 'magic word',
              value: 'abracadabra',
            },
            {
              metadataType: 'magic spell',
              value: 'fireball',
            },
        ]
        },
      ],
    },
  ];
  const exDev: Device = {
    name: 'testDevice',
    devtype: 'ActuatingDevice',
    userId: 'magic-user',
    services: [
      {
        endpoint: 'test.endpoint',
        interfaceType: 'black magic',
        metadata: [{
          metadataType: 'magic word',
          value: 'abracadabra',
        }],
      },
    ],
  };
  const exCreateDevDto: CreateDeviceDto = {
    name: 'testDevice',
    devtype: 'ActuatingDevice',
    userId: 'magic-user',
    services: [
      {
        endpoint: 'test.endpoint',
        interfaceType: 'black magic',
        metadata: [{
          metadataType: 'magic word',
          value: 'abracadabra',
        }],
      },
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        DevicesModule,
        MongooseModule.forFeature(
          [{ name: Device.name, schema: DeviceSchema }],
          'devicesTest',
        ),
      ],
      controllers: [],
      providers: [],
    }).compile();

    devicesService = moduleRef.get<DevicesService>(DevicesService);
    devicesController = moduleRef.get<DevicesController>(DevicesController);
    connectiondev = moduleRef.get(getConnectionToken('devices'));
    connectiontest = moduleRef.get(getConnectionToken('devicesTest'));
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {
      jest.spyOn(devicesService, 'findAllById').mockResolvedValueOnce(exDevArray);

      expect(await devicesController.findAll('magic-user')).toBe(exDevArray);
    });
  });

  describe('addOne', () => {
    it('should return a device', async () => {
      jest.spyOn(devicesService, 'create').mockResolvedValueOnce(exDev);

      expect(await devicesController.addOne('gattino', exCreateDevDto)).toBe(exDev);
    });
  });

  describe('findOne', () => {
    it('should return a device', async () => {
      jest.spyOn(devicesService, 'findOne').mockResolvedValueOnce(exDev);

      expect(await devicesController.findOne('this is an id')).toBe(exDev);
    });
  });

  afterAll(async () => {
    await connectiondev.close(true);
    await connectiontest.close(true);
  });
});
