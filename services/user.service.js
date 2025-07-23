import axios from "./root.service";

const headers = {
  "Content-Type": "multipart/form-data",
};

export const getProfile = async (id) => {
  try {
    const response = await axios.get(`user/getUserByID/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log("[ERROR]-> user.service-> getProfile: ", error.message);
  }
};

export const register = async (FormData) => {
  try {
    const response = await axios.post(`user/create`, FormData, headers);
    return {
      success: true,
      data: response.data.data,
      message: "Registro exitoso",
    };
  } catch (error) {
    console.log("[ERROR]-> user.service-> register: ", error.message);
    return {
      success: false,
      message: error.response?.data?.message || "En estos momentos no podemos procesar tu solicitud. Intenta más tarde.",
      error: error.response?.data?.details || error.message,
      status: error.response?.status || 500,
    };
  }
};

export const followUser = async(id) =>{
  try {
    const response = await axios.post(`user/follow/${id}`)
    return {
      success: true,
      message: response.data?.data?.message || "Usuario seguido exitosamente",
    };
  } catch (error) {
    console.log("[ERROR]-> user.service-> followUser: ", error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Error al seguir al usuario",
    };
  }
}

export const unFollowUser = async(id) =>{
  try {
    const response = await axios.post(`user/unfollow/${id}`)
    return {
      success: true,
      message: response.data?.data?.message || "Dejaste de seguir al usuario",
    };
  } catch (error) {
    console.log("[ERROR]-> user.service-> followUser: ", error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Error al dejar de seguir al usuario",
    };
  }
}

export const updateUser = async(FormData) =>{
  try {
    for (let pair of FormData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const response = await axios.put(`user/updateUser`, FormData)
    
    return {
      success: true,
      message: response?.data?.data.message || "Usuario actualizado con exito"
    }
    
  } catch (error) {
    console.log("[ERROR]-> user.service-> updateUser: ", error);
    throw { success: false, message: error.response?.data?.message, status: error.response?.status || 500}
  }
}