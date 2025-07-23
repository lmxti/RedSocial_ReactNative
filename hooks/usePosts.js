// <-------------------------- MODULOS -------------------------->
import { useState, useCallback, useEffect } from "react";
// <------------------------ COMPONENTES ------------------------>

// <------------------------- SERVICIOS ------------------------->
import { createPost, getPosts, getPostsFollowed } from "../services/post.service";

import { useSelector } from "react-redux";


export const usePosts = ( fetchType = "all") => {
  // Estado para almacenar publicaciones.
  const [posts, setPosts] = useState([]);
  // Estado booleano que indica si publicaciones estan siendo cargadas.
  const [loading, setLoading] = useState(true);
  // Estado booleano que indica si la lista de publicaciones se esta actualizando.
  const [refreshing, setRefreshing] = useState(false);
  // Estado (null por default) que guarda cualquier error al cargar/crear publicaciones.
  const [error, setError] = useState(null);

  const { user: currentUser } = useSelector((state) => state.auth);

  /**
   * Funcion `memoizada` encargada de **cargar todas las publicaciones** y actualizar el estado local.
   *
   * @returns {Promise<void>} No retorna nada directamente, solo actualiza el estado del hook.
   *
   * @throws {Error} Si Ocurre un error al obtener publicaciones
   */
  const loadPosts = useCallback(async () => {
    try {
      // Solicitud para traer publicaciones
      let allPosts = await getPosts();
      if (fetchType === "all") {
        allPosts = await getPosts();
      } else if (fetchType === "following" && currentUser) {
        allPosts = await getPostsFollowed(currentUser.id);
      }
      // Actualizacion de estado de publicaciones con lista de publicaciones obtenida.
      setPosts(allPosts);
      // Actualizacion/limpieza de estado de errores.
      setError(null);
    } catch (err) {
      setError(err.message || "Error al cargar publicaciones");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
  /* NOTA: Una vez renderizado el hook, solo se ejecuta cada vez que loadPosts cambie
   (aunque, ya que esta memorizada, no cambiabara a menos que cambie su definicion).*/
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /**
   * Funcion `memoizada` encargada de **crear una nueva publicacion** utilizando datos proporcionados.
   *
   * @param {Object} postData Datos de publicacion a crear(formData)
   * @returns {Promise<boolean>} `true` si la publicacion se creo o `false` si ocurrio un error.
   * @throws {Error} Si Ocurre un error al intentar crear una publicacion.
   */
  const handleCreatePost = useCallback(async (postData) => {
    try {
      setLoading(true);
      // Solicitud para crear una publicacion con datos proporcionados(postData)
      const { success, data, message } = await createPost(postData);

      // Caso 1: Creacion exitosa, incorpora la nueva publicacion al principio de la lista de publicaciones (posts)
      if (success) {
        setPosts((prev) => [data, ...prev]);
        setError(null);
        return true;
      }
      // Caso 2: Error de creacion, lanza excepcion con el mensaje de error recibido
      throw new Error(message);
    } catch (err) {
      // Actualiza el estado "error" con el mensaje de error.
      setError(err.message || "Error al crear publicación");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Funcion `memoizada` encargada de refrescar la lista de publicaciones(posts)
   */
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts();
  }, [loadPosts]);

  return {
    posts,
    loading,
    refreshing,
    error,
    handleCreatePost,
    handleRefresh,
  };
};
