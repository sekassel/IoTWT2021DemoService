import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateWaterFillDto } from './dto';
import { UpdateWaterFillDto } from './dto/update-water-fill.dto';
import { WaterFill } from './water-fill.interface';

import { WaterFillService } from './water-fill.service';

@Controller('water-fill')
@UsePipes(new ValidationPipe())
export class WaterFillController {
  constructor(private readonly waterFillService: WaterFillService) {}

  @Post()
  async create(@Body() dto: CreateWaterFillDto): Promise<WaterFill> {
    return this.waterFillService.create(dto);
  }

  @Get()
  async get(@Query('timestamp') timestamp: number): Promise<WaterFill[]> {
    return this.waterFillService.getAll(timestamp);
  }

  @Get('/last')
  async getLast(): Promise<WaterFill> {
    return this.waterFillService.getLast();
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<WaterFill> {
    const doc = await this.waterFillService.getOne(id);
    if (!doc) {
      throw new NotFoundException();
    }
    return doc;
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() dto: UpdateWaterFillDto,
  ): Promise<WaterFill> {
    const doc = await this.waterFillService.getOne(id);
    if (!doc) {
      throw new NotFoundException();
    }
    return this.waterFillService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<WaterFill> {
    const doc = await this.waterFillService.getOne(id);
    if (!doc) {
      throw new NotFoundException();
    }

    await this.waterFillService.delete(id);
    return doc;
  }

  @Get('action/on')
  async activate(): Promise<string> {
    const result = await this.waterFillService.sendActionOn();
    return result.statusText;
  }

  @Get('action/off')
  async deactivate(): Promise<string> {
    const result = await this.waterFillService.sendActionOff();
    return result.statusText;
  }

  @Get('/tank/status')
  async getTankStatus(): Promise<boolean> {
    const lastValue = (await this.getLast()).value;
    if (lastValue > 75) {
      return true;
    } else {
      return false;
    }
  }
}
