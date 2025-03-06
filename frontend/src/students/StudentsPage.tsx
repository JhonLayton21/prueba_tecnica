import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getStudents from './students';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState<{ id: number; nombre: string }[]>(
    [],
  );
  const navigate = useNavigate();

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .catch((error) => console.error('Error obteniendo estudiantes:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Lista de Estudiantes</Typography>
      <List>
        {students?.length > 0 ? (
          students.map((student) => (
            <ListItem key={student.id} component="button" onClick={() => navigate(`/estudiantes/${student.id}`)}>
              <ListItemText primary={student.nombre} />
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

export default Students;
