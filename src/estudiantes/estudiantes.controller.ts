import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  @Get()
  async findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudiantesService.update(+id, updateEstudianteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}
