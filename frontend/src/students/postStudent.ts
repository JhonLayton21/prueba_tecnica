import api from "../utils/api";

const postStudent = async (nombre: string) => {
    try {
        const response = await api.post("/estudiantes", {nombre});
        return response.data;
    } catch (error) {
        console.error('Error al registrar el estudiante', error);
    }
};

export default postStudent;