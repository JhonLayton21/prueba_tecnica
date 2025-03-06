import api from "../utils/api";

const getStudents = async () => {
    try {
        const response = await api.get("/estudiantes");
        console.log("Datos de la respuesta:", response.data);

        return response.data;
    } catch (error) {
        console.error('Error obteniendo estudiantes', error);
        return [];
    }
}

export default getStudents;