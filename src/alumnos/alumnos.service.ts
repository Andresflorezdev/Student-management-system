import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { AlumnosRepository } from './alumnos.repository';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumnos.dto';

@Injectable()
export class AlumnosService {
  constructor(private readonly alumnosRepository: AlumnosRepository) {}

  findAll() {
    return this.alumnosRepository.findAll();
  }

  async findOne(id: number) {
    const alumno = await this.alumnosRepository.findOne(id);
    if (!alumno)
      throw new NotFoundException(`Alumno con id ${id} no encontrado`);
    return alumno;
  }

  async create(dto: CreateAlumnoDto) {
    try {
      return await this.alumnosRepository.create(dto);
    } catch (error: unknown) {
      if (isPrismaKnownRequestError(error) && error.code === 'P2002') {
        throw new ConflictException('El email ya esta registrado');
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdateAlumnoDto) {
    await this.findOne(id);
    try {
      return await this.alumnosRepository.update(id, dto);
    } catch (error: unknown) {
      if (isPrismaKnownRequestError(error) && error.code === 'P2002') {
        throw new ConflictException('El email ya esta registrado');
      }
      throw error;
    }
  }
  async remove(id: number) {
    await this.findOne(id);
    return this.alumnosRepository.remove(id);
  }
}

function isPrismaKnownRequestError(
  error: unknown,
): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError;
}
