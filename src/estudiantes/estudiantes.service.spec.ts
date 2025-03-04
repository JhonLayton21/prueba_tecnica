import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesService } from './estudiantes.service';

describe('Registro de estudiantes', () => {
  let service: EstudiantesService;

  beforeEach(() => {
    service = new EstudiantesService();  
  });

  it('debe registrar un estudiante', async () => {
    const estudiante = await service.registrar({ nombre: 'Juan Perez' });
    expect(estudiante).toHaveProperty('id');
    expect(estudiante.nombre).toBe('Juan Perez');
  });
});
