import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: {
        nombre: createEstudianteDto.nombre,
      },
    });
  }

  async findAll() {
    return this.prisma.estudiante.findMany({
      include: {
        cursos: {
          include: {
            curso: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.estudiante.findUnique({
      where: { id },
      include: {
        cursos: {
          include: {
            curso: true,
          },
        },
      },
    });
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return this.prisma.estudiante.update({
      where: { id },
      data: {
        nombre: updateEstudianteDto.nombre,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.estudiante.delete({
      where: { id },
    });
  }
}
