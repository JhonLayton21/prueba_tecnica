import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { CursosModule } from './cursos/cursos.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [EstudiantesModule, CursosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
