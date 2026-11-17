
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CajaGeneralController } from './caja-general.controller.js';
import { CajaGeneralService } from './caja-general.service.js';
import {
  CajaGeneral,
  CajaGeneralSchema,
} from './entities/caja-general.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CajaGeneral.name,
        schema: CajaGeneralSchema,
      },
    ]),
  ],
  controllers: [CajaGeneralController],
  providers: [CajaGeneralService],
  exports: [CajaGeneralService],
})
export class CajaGeneralModule {}
