import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocController } from './docu';
import {
  WaterFillController,
  WaterFillSchema,
  WaterFillService,
} from './water-fill';

const mongoUri =
  process.env.MONGO_USER && process.env.MONGO_PASS
    ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@database:27017/iot-services`
    : 'mongodb://localhost:27017/waterfill';

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([{ name: 'waterfill', schema: WaterFillSchema }]),
  ],
  controllers: [DocController, WaterFillController],
  providers: [WaterFillService],
})
export class AppModule {}
