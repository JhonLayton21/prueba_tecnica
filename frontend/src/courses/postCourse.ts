import api from "../utils/api";

const postCourse = async (nombre: string, cupoMaximo: number, estudiantesIds?: number[]) => {
    try {
        const response = await api.post("/cursos", { nombre, cupoMaximo, estudiantesIds });
        return response.data;
    } catch (error) {
        console.error('Error al registrar el curso', error);
        throw error;
    }
};

export default postCourse;
