import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Students from "./students/StudentsPage";
import CourseDetail from "./courses/CourseDetailPage";
import Courses from "./courses/CoursesPage";
import { Button, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Container>
        <Button variant="contained" component={Link} to="/estudiantes">Sección Estudiantes</Button>
        <Button variant="contained" component={Link} to="/cursos">Sección Cursos</Button>

        <Routes>
          <Route path="/estudiantes" element={<Students />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/cursos/:id" element={<CourseDetail />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
