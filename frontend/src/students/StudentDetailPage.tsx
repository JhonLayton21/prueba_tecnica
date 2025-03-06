import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getStudentById from './getStudentById';
import { Container, Typography, List, ListItem } from '@mui/material';

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<{
    id: number;
    nombre: string;
    cursos: any[];
  } | null>(null);

  useEffect(() => {
    getStudentById(Number(id))
      .then(setStudent)
      .catch((error) => console.error('Error obteniendo el estudiante', error));
  }, [id]);

  if (!student) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{student.nombre}</Typography>
      <Typography variant="body1">Número de identificación: {student.id}</Typography>
      <Typography variant="body1">
        Cursos inscritos: {student.cursos.length}
      </Typography>

      <Typography variant="h6">Lista de cursos:</Typography>
      <List>
        {student.cursos.map((curso) => (
          <ListItem key={curso.cursoId}>
            {curso.curso.nombre}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default StudentDetail;
