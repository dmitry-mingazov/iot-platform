import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Device } from './schemas/device.schema';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ConfigService } from '@nestjs/config';

@Controller('/api/devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Post()
  addOne(@Body() dto: CreateDeviceDto): Promise<Device> {
    return this.devicesService.create(dto);
  }
}
