import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({
      data: {
        nombre: createCursoDto.nombre,
        cupoMaximo: createCursoDto.cupoMaximo,
        estudiantes: createCursoDto.estudiantesIds?.length
          ? {
            create: createCursoDto.estudiantesIds.map((estudianteId) => ({
              estudiante: { connect: { id: estudianteId } },
            })),
          }
        : undefined,
      },
      include: {
        estudiantes: {
          include: {
            estudiante: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.curso.findMany();
  }

  async findOne(id: number) {
    return this.prisma.curso.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prisma.curso.update({
      where: { id },
      data: {
        nombre: updateCursoDto.nombre,
        cupoMaximo: updateCursoDto.cupoMaximo,
        estudiantes: updateCursoDto.estudiantesIds?.length
          ? {
              deleteMany: {}, // Elimina todas las relaciones previas
              create: updateCursoDto.estudiantesIds.map((estudianteId) => ({
                estudiante: { connect: { id: estudianteId } }, // Conectar nuevos estudiantes
              })),
            }
          : undefined,
      },
      include: {
        estudiantes: {
          include: {
            estudiante: true,
          },
        },
      },
    });
  }  

  async remove(id: number) {
    return this.prisma.curso.delete({
      where: { id },
    });
  }
}
