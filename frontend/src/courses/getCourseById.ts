import api from "../utils/api";

const getCourseById = async (id: number) => {
  try {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error obteniendo el curso", error);
  }
};

export default getCourseById;
