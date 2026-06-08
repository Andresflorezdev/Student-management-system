import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumnos.dto';

@Injectable()
export class AlumnosRepository {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.alumno.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.alumno.findUnique({
      where: { id },
    });
  }

  create(dto: CreateAlumnoDto) {
    return this.prisma.alumno.create({
      data: dto,
    });
  }

  update(id: number, dto: UpdateAlumnoDto) {
    return this.prisma.alumno.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.alumno.delete({
      where: { id },
    });
  }
}
