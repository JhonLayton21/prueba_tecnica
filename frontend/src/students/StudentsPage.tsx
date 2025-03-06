import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getStudents from './students';
import postStudent from './postStudent';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal, 
  Box, 
  TextField
} from '@mui/material';

const Students = () => {
  const [students, SetStudents] = useState<{ id: number; nombre: string }[]>(
    [],
  );
  const navigate = useNavigate();
  const [ open, SetOpen ] = useState(false);
  const [ newStudentName, SetNewStudentName ] = useState('');

  // Obtener estudiantes
  useEffect(() => {
    getStudents()
      .then(SetStudents)
      .catch((error) => console.error('Error obteniendo estudiantes:', error));
  }, []);

  // Agregar nuevo estudiante
  const handleAddStudent = async () => {
    if (!newStudentName.trim()) return;

    try {
      const newStudent = await postStudent(newStudentName);
      SetStudents((prev) => [...prev, newStudent]);
      SetOpen(false);
      SetNewStudentName('');
    } catch (error) {
      console.error("Error al registrar el estudiante", error);
    }
  }

  return (
    <Container>
      <Typography variant="h4">Lista de Estudiantes</Typography>
      <Button variant="contained" onClick={() => SetOpen(true)}>Registrar nuevo estudiante</Button>
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

      {/* Modal para registrar nuevo estudiante */}
      <Modal open={open} onClose={() => SetOpen(false)}>
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 
        }}>
          <Typography variant="h6">Registrar nuevo Estudiante</Typography>
          <TextField 
            fullWidth 
            label="Nombre del estudiante" 
            variant="outlined" 
            margin="normal"
            value={newStudentName}
            onChange={(e) => SetNewStudentName(e.target.value)}
          />
          <Button variant="contained" fullWidth onClick={handleAddStudent}>
            Agregar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Students;
