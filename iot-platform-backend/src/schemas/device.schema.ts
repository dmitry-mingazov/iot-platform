import { Service, ServiceSchema } from './service.schema';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type DeviceDocument = Device & Document;

export class Device {
  name: string;
  devtype: string;
  services: Service[];
}

export const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  devtype: {
    type: String,
    required: true,
    enum: ['ActuatingDevice', 'SensingDevice', 'TagDevice'],
  },
  services: {
    type: [ServiceSchema],
    required: true,
    validate: [(arr) => arr.length > 0, "{PATH} can't be empty"],
  },
});
