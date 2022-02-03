import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export class Metadata {
  metadataType: string;
  value: string;
}

export const MetadataSchema = new mongoose.Schema({
  metadataType: { type: String, required: true },
  value: { type: String, required: true },
});
