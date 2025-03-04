import api from "../utils/api"

const getCourses = async () => {
    try {
        const response = await api.get("/cursos");
        return response.data;
    } catch (error) {
        console.error("Error obteniendo cursos", error);
    }
}

export default getCourses;