// <-------------------------- MODULOS -------------------------->

// <------------------------ COMPONENTES ------------------------>
import { FlatList, ActivityIndicator, Text, View, RefreshControl } from "react-native";
import PostItem from "./PostItem";
// <------------------------- SERVICIOS ------------------------->

/**
 * @component
 * Componente encargado de renderizar publicaciones en forma de scroll vertical.
 * 
 * @param {Object} props - Props del componente.
 * @param {Array<Object>} props.posts - Array de publicaciones a renderizar.
 * @param {boolean} props.loading - Indica si las publicaciones están cargando inicialmente.
 * @param {boolean} props.refreshing - Indica si se está haciendo un "pull-to-refresh".
 * @param {function(): void} props.onRefresh - Función que se ejecuta al hacer "pull-to-refresh".
 * 
 * @returns {JSX.Element} Lista interactiva de publicaciones.
 */
export default function PostList({ posts, loading, refreshing, onRefresh }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <PostItem post={item} />}
      ListEmptyComponent={
        !loading && (
          <Text className="text-center mt-5 text-gray-500">
            No hay publicaciones. ¡Sé el primero en publicar algo!
          </Text>
        )
      }
      ListFooterComponent={
        loading && !refreshing && (
          <View className="py-5">
            <ActivityIndicator size="small" color="#4a90e2" />
          </View>
        )
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#4a90e2"]}
          tintColor="#4a90e2"
        />
      }
      contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
    />
  );
}
