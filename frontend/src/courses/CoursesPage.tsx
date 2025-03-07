import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCourses from './courses';
import getStudents from '../students/students';
import postCourse from './postCourse';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal, 
  Box, 
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const Courses = () => {
  const [courses, setCourses] = useState<
    { id: number; nombre: string; cupoMaximo: number; estudiantes: any[] }[]
  >([]);
  const [students, setStudents] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseQuota, setNewCourseQuota] = useState<number | ''>('');

  // Obtener cursos
  useEffect(() => {
    getCourses()
      .then(setCourses)
      .catch((error) => console.error('Error obteniendo cursos:', error));

    getStudents()
    .then(setStudents)
    .catch((error) => console.error('Error obteniendo estudiantes:', error)); 
  }, []);

  // Agregar nuevo curso
  const handleAddCourse = async () => {
    if (!newCourseName.trim() || newCourseQuota === '') return;

    try {
      const newCourse = await postCourse(newCourseName, newCourseQuota, selectedStudents);
      setCourses((prev) => [...prev, newCourse]);
      setOpen(false);
      setNewCourseName('');
      setNewCourseQuota('');
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error al registrar el curso', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Lista de Cursos</Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Registrar nuevo curso
      </Button>
      <List>
        {courses?.length > 0 ? (
          courses.map((course) => (
            <ListItem
              key={course.id}
              component="button"
              onClick={() => navigate(`/cursos/${course.id}`)}
            >
              <ListItemText
                primary={course.nombre}
                secondary={`Cupo Máximo: ${course.cupoMaximo} - Estudiantes: ${course.estudiantes.length}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">
            No hay cursos disponibles
          </Typography>
        )}
      </List>

      {/* Modal para registrar nuevo curso */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          <Typography variant="h6">Registrar nuevo Curso</Typography>
          <TextField
            fullWidth
            label="Nombre del curso"
            variant="outlined"
            margin="normal"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Cupo máximo"
            type="number"
            variant="outlined"
            margin="normal"
            value={newCourseQuota}
            onChange={(e) => setNewCourseQuota(Number(e.target.value))}
          />

          {/* Selección de estudiantes */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Seleccionar Estudiantes</InputLabel>
            <Select
              multiple
              value={selectedStudents}
              onChange={(e) => setSelectedStudents(e.target.value as number[])}
              renderValue={(selected) =>
                students
                  .filter((student) => selected.includes(student.id))
                  .map((s) => s.nombre)
                  .join(', ')
              }
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button variant="contained" fullWidth onClick={handleAddCourse}>
            Agregar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Courses;