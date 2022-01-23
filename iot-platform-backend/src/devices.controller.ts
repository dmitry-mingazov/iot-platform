import { Body, Controller, Get, Param, Post, Query, UseGuards, } from '@nestjs/common';
import { Device } from './schemas/device.schema';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserId } from './decorators/user.decorator';
import OntologyConverter from './helpers/ontologyconverter';

@Controller('/api')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
  ) {}

  @Get('/devices')
  @UseGuards(AuthGuard('jwt'))
  findAll(@AuthUserId() userId: string, @Query() query: any): Promise<Device[]> {
    if (!query.ids) {
      return this.devicesService.findAllByUserId(userId);
    } else {
      const ids: string[] = query.ids.split(',');
      return this.findAllByIds(userId, ids);
    }
  }

  async findAllByIds(userId: string, ids: string[]): Promise<Device[]>{
    return this.devicesService.findAllByIds(userId, ids);
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

  @Post('/devices')
  @UseGuards(AuthGuard('jwt'))
  addMany(
    @AuthUserId() userId: string,
    @Body() dtos: CreateDeviceDto[],
  ): Promise<Device[]> {
    return this.devicesService.createMany(
      dtos.map((dto) => ({ ...dto, userId })),
    );
  }

  @Get('/device/turtle/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneToturtle(@Param('id') id: string): Promise<string> {
    return this.devicesService.findOne(id).then((res) => {
      return OntologyConverter.deviceToOntology(res);
    });
  }
}
