import { model } from 'mongoose';
import { Device, DeviceSchema } from './device.schema';
jest.useFakeTimers('legacy');

const exDevDto = () => {
  return {
    name: 'test',
    userId: 'pino_spanuli',
    description: "Gastani Frinzi's favourite device",
    devtype: 'ActuatingDevice',
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
        ,
      },
    ],
  };
};

const devModel = model(Device.name, DeviceSchema);
let dto;
describe('DeviceSchema', () => {
  beforeEach(() => {
    dto = exDevDto();
  });
  it('should accept a properly formed dto', (done) => {
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err).toBeUndefined();
      done();
    });
  });
  it('should fail on missing user id field', (done) => {
    delete dto.userId;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.userId).toBeDefined();
      done();
    });
  });
  it('should fail on missing name field', (done) => {
    delete dto.name;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.name).toBeDefined();
      done();
    });
  });
  it('should fail on missing devtype field', (done) => {
    delete dto.devtype;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.devtype).toBeDefined();
      done();
    });
  });
  it('should fail on unsupported devtype field', (done) => {
    dto.devtype = 'Asdrubale';
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.devtype.kind).toBeDefined();
      expect(err.errors.devtype.kind).toBe('enum');
      done();
    });
  });
  it('should fail on missing services field', (done) => {
    delete dto.services;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.services).toBeDefined();
      done();
    });
  });
  it('should fail on empty services list', (done) => {
    dto.services = [];
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors.services.kind).toBeDefined();
      done();
    });
  });
  it('should fail on missing interface type field', (done) => {
    delete dto.services[0].interfaceType;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors['services.0.interfaceType']).toBeDefined();
      done();
    });
  });
  it('should fail on missing metadata field', (done) => {
    delete dto.services[0].metadata;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors['services.0.metadata']).toBeDefined();
      done();
    });
  });
  it('should fail on missing metadata type field', (done) => {
    delete dto.services[0].metadata[0].metadataType;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors['services.0.metadata.0.metadataType']).toBeDefined();
      done();
    });
  });
  it('should fail on missing metadata value field', (done) => {
    delete dto.services[0].metadata[0].value;
    const dev = new devModel(dto);
    dev.validate((err) => {
      expect(err.errors['services.0.metadata.0.value']).toBeDefined();
      done();
    });
  });
});
