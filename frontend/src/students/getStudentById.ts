import api from "../utils/api";

const GetStudentById = async (id: number) => {
    try {
        const response = await api.get(`/estudiantes/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error obteniendo el estudiante", error);
    }
};

export default GetStudentById;