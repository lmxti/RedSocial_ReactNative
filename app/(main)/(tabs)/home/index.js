// <-------------------------- MODULOS -------------------------->

// <------------------------ COMPONENTES ------------------------>
import Screen from "../../../../components/Screen";
import PostList from "../../../../components/post/PostList";
import CreatePost from "../../../../components/post/CreatePost";
import { View, Text } from "react-native";
// <------------------------- SERVICIOS ------------------------->

/*---------------------------- HOOKS ----------------------------*/
import { usePosts } from "../../../../hooks/usePosts";

/**
 * @page
 * Pantalla principal de la aplicacion(feed) que permite crear y visualizar publicaciones.
 * 
 * [NOTA]: Utiliza un hook personalizado `usePosts` para gestionar los estados globales
 * que se utilizan para **pasar props** a los componentes hijos para que estos tengan acceso
 * a las funciones/estados relacionados. (prop drilling).
 * 
 * @returns {JSX.Element} Vista completa de la pantalla de inicio(feed).
 */
export default function HomeScreen() {

  // Hook que gestiona publicaciones y sus estados (carga, error, refresco)
  const { posts, loading, refreshing, error, handleCreatePost, handleRefresh } = usePosts("following");

  return (
    <Screen>
      <CreatePost onSubmit={handleCreatePost} loading={loading} />
      {error && (<View className="bg-slate-800  my-2 p-3 rounded-lg"> <Text className="text-white text-center">{error}</Text></View>)}
      <PostList posts={posts} loading={loading} refreshing={refreshing} onRefresh={handleRefresh} />
    </Screen>
  );
}
