
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MesaController } from './mesa.controller';
import { MesaService } from './mesa.service';
import { Mesa, MesaSchema } from './entities/mesa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mesa.name, schema: MesaSchema },
    ]),
  ],
  controllers: [MesaController],
  providers: [MesaService],
  exports: [MesaService],
})
export class MesaModule {}
