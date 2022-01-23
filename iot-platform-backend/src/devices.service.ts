import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const createdDevice = new this.deviceModel(createDeviceDto);
    return createdDevice.save({ validateBeforeSave: true });
  }

  async createMany(createDeviceDtos: CreateDeviceDto[]): Promise<Device[]> {
    return this.deviceModel.insertMany(createDeviceDtos);
  }

  async findOne(id: string): Promise<Device> {
    return this.deviceModel.findById(id).exec();
  }

  async findAll(): Promise<Device[]> {
    return this.deviceModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<Device[]> {
    return this.deviceModel.find({userId}).exec();
  }

  async findAllByIds(userId: string, ids: string[]): Promise<Device[]> {
    return this.deviceModel.find({_id: ids, userId});
  }

}
