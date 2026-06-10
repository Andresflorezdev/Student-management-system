import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import { AlumnosRepository } from './alumnos.repository';

@Module({
  controllers: [AlumnosController],
  providers: [AlumnosService, AlumnosRepository],
})
export class AlumnosModule {}
