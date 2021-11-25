import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Metadata, MetadataSchema } from './metadata.schema';
import * as mongoose from 'mongoose';

export class Service {
  endpoint: string;
  interfaceType: string;
  metadata: Metadata;
}

export const ServiceSchema = new mongoose.Schema(
  {
    endpoint: { type: String, required: true },
    interfaceType: { type: String, required: true },
    metadata: {
      type: MetadataSchema,
      required: true,
    },
  },
  { id: false, _id: false },
);
