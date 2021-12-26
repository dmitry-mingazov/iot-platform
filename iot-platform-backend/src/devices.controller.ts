import { Body, Controller, Get, Param, Post, UseGuards, } from '@nestjs/common';
import { Device } from './schemas/device.schema';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserId } from './decorators/user.decorator';

@Controller('/api')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/devices')
  @UseGuards(AuthGuard('jwt'))
  findAll(@AuthUserId() userId: string): Promise<Device[]> {
    return this.devicesService.findAllById(userId);
  }

  @Get('/device/:id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<Device> {
    return this.devicesService.findOne(id);
  }

  @Post('/device')
  @UseGuards(AuthGuard('jwt'))
  addOne(
    @AuthUserId() userId: string,
    @Body() dto: CreateDeviceDto,
  ): Promise<Device> {
    return this.devicesService.create({ userId, ...dto });
  }
}
