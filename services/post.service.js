import axios from "./root.service";
import store from "../redux/store";

const headers = {
  "Content-Type": "multipart/form-data",
};

export const createPost = async (FormData) => {
  try {
    const { user } = store.getState().auth;
    if (!user) throw new Error("Error `Post.service.js->createPost: ` Usuario no encontrado");
    FormData.append("author", user.id);
    const response = await axios.post(`post/create`, FormData, headers);

    return {
      success: true,
      data: response.data.data,
      message: "Publicacion creada con exito"
    };
  } catch (error) {
    console.log("Error `Post.service.js->createPost: `", error.message);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500
    }
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get("post/getPosts");
    return response.data.data.data;
  } catch (error) {
    console.log("Error `Post.service.js->getPosts: `", error);
  }
};

export const getPostsUser = async (id) => {
  try {
    const response = await axios.get(`post/getPostsById/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log("Error `Post.service.js->getPostsUser: `", error);
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`post/getPostById/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log("Error `Post.service.js->getPostById: `", error);
  }
};


export const getPostsFollowed = async (id) => {
  try {
    const response = await axios.get(`post/getPostsFollowed/${id}`);
    return response.data.data.data;
  } catch (error) {
    console.log("Error `Post.service.js->getPostFollowed: `", error);
  }
}

export const commentPost = async(FormData) =>{
  try {
    const response = await axios.post(`comment/create`, FormData, headers);    
    return {
      success: true,
      data: response.data.data,
      message: "Comentario creado con exito"
    };
  } catch (error) {
    console.log("Error `Post.service.js->commentPost: `", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500
    }
  }
};

export const getCommentsPostById = async(id)=>{
  try {
    const response = await axios.get(`comment/getCommentsPostById/${id}`);
    return {
      success: true,
      data: response.data.data,
      message: "Comentarios de publicacion obtenidos con exito"
    }
  } catch (error) {
    console.log("Error `Post.service.js->getCommentsPost: `", error);
    return {
      success: false,
      message: error.response?.data?.message,
      status: error.response?.status || 500
    }
  }
}

export const toggleLikePost = async(id) =>{
  try {
    const response = await axios.put(`post/toggleLike/${id}`);
    return {
      success: true,
      data: response.data.data,
      message: "Like dado correctamente a publicacion"
    }
    
  } catch (error) {
    throw { success: false, message: error.response?.data?.message, status: error.response?.status || 500}
  }
}