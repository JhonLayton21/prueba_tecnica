import React from 'react';
import { useEffect, useState } from 'react';
import getCourses from './courses';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState<
    { id: number; nombre: string; cupoMaximo: number; estudiantes: any[] }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch((error) => console.error('Error obteniendo cursos:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Lista de Cursos</Typography>
      <List>
        {courses?.length > 0 ? (
          courses.map((courses) => (
            <ListItem
              key={courses.id}
              component="button"
              onClick={() => navigate(`/cursos/${courses.id}`)}
            >
              <ListItemText
                primary={courses.nombre}
                secondary={`Cupo Máximo: ${courses.cupoMaximo} - Estudiantes: ${courses.estudiantes.length}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">
            No hay estudiantes disponibles
          </Typography>
        )}
      </List>
    </Container>
  );
};

export default Courses;
