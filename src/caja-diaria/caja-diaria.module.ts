import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CajaDiaria, CajaDiariaSchema } from './entities/caja-diaria.entity';
import { CajaDiariaController } from './caja-diaria.controller';
import { CajaDiariaService } from './caja-diaria.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CajaDiaria.name, schema: CajaDiariaSchema },
    ]),
  ],
  controllers: [CajaDiariaController],
  providers: [CajaDiariaService],
  exports: [CajaDiariaService],
})
export class CajaDiariaModule {}
