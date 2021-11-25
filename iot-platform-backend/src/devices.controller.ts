import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Device } from './schemas/device.schema';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<Device[]> {
    return this.devicesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addOne(@Body() dto: CreateDeviceDto): Promise<Device> {
    return this.devicesService.create(dto);
  }
}
