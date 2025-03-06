import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getCourseById from "../courses/getCourseById"; 
import { Container, Typography, List, ListItem } from "@mui/material";

const CourseDetail = () => {
  const { id } = useParams(); 
  const [course, setCourse] = useState<{ id: number; nombre: string; cupoMaximo: number; estudiantes: any[] } | null>(null);

  useEffect(() => {
    getCourseById(Number(id))
      .then(setCourse)
      .catch((error) => console.error("Error obteniendo el curso:", error));
  }, [id]);

  if (!course) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4">{course.nombre}</Typography>
      <Typography variant="body1">Cupo Máximo: {course.cupoMaximo}</Typography>
      <Typography variant="body1">Estudiantes inscritos: {course.estudiantes.length}</Typography>

      <Typography variant="h6">Lista de estudiantes:</Typography>
      <List>
        {course.estudiantes.map((inscripcion) => (
          <ListItem key={inscripcion.estudianteId}>
            {inscripcion.estudiante.nombre}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CourseDetail;
