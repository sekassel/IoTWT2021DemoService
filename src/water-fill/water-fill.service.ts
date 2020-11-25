import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';

import { CreateWaterFillDto } from './dto';
import { UpdateWaterFillDto } from './dto/update-water-fill.dto';
import { WaterFill } from './water-fill.interface';

@Injectable()
export class WaterFillService {
  private readonly particleUrl = 'https://api.particle.io/v1/devices/event';
  private readonly token = process.env.PARTICLE_TOKEN || '';

  constructor(
    private readonly http: HttpService,
    @InjectModel('waterfill') private readonly waterFillModel: Model<WaterFill>,
  ) {}

  async create(dto: CreateWaterFillDto): Promise<WaterFill> {
    return this.waterFillModel.create(dto);
  }

  async getAll(timestamp?: number): Promise<WaterFill[]> {
    const query = timestamp || 0;
    return this.waterFillModel.find({ timestamp: { $gt: query } }).exec();
  }

  async getOne(id: string): Promise<WaterFill> {
    return this.waterFillModel.findById(id);
  }

  async getLast(): Promise<WaterFill> {
    return (await this.waterFillModel.find({}).sort('-_id').limit(1))[0];
  }

  async update(id: string, dto: UpdateWaterFillDto): Promise<WaterFill> {
    return this.waterFillModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();
  }

  async delete(id: string): Promise<WaterFill> {
    return await this.waterFillModel.findByIdAndDelete(id).exec();
  }

  async sendActionOn(): Promise<AxiosResponse<any>> {
    const body = {
      name: 'actionEventOn',
      data: 'turnOn',
      private: true,
      ttl: 60,
    };

    return this.http
      .post(`${this.particleUrl}?access_token=${this.token}`, body)
      .toPromise();
  }

  async sendActionOff(): Promise<AxiosResponse<any>> {
    const body = {
      name: 'actionEventOff',
      data: 'turnOff',
      private: true,
      ttl: 60,
    };

    return this.http
      .post(`${this.particleUrl}?access_token=${this.token}`, body)
      .toPromise();
  }
}
