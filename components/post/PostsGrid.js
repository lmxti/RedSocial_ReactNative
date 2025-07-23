// <-------------------------- MODULOS -------------------------->
import { useRouter } from "expo-router";
import { API_BASE_URL, POST_MEDIA_PATH } from "@env";
// <------------------------ COMPONENTES ------------------------>
import {
  FlatList,
  View,
  Text,
  Image,
  RefreshControl,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
// <------------------------- SERVICIOS ------------------------->

export default function PostsGrid({ posts, refreshing, onRefresh }) {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <Pressable
      className="aspect-square flex-1 m-1 "
      onPress={() => router.push(`/(main)/post/${item._id}`)}
    >
      {item.media?.[0] ? (
        <View className="flex-1">
          {/*<---------------------------------------------------------- IMAGEN[0] DE PUBLICACION --------------------------------------------------------->*/}
          <Image
            className="w-full h-full rounded"
            resizeMode="cover"
            source={{
              uri: `${API_BASE_URL}${POST_MEDIA_PATH}/${item.media[0]}`,
            }}
          />
          {/*<---------------------------------------------- ICONO DE TIPO DE PUBLICACION (MAS DE UNA IMAGEN) --------------------------------------------->*/}
          {item.media.length > 1 && (
            <View className="absolute top-2 right-2 bg-black/60 rounded-full p-2">
              <Ionicons name="images" size={16} color="white" />
            </View>
          )}
        </View>
      ) : (
        <View className="flex-1">
          {/*<---------------------------------------------TEXTO DE PUBLICACION(DESCRIPTION) DE PUBLICACION -------------------------------------------->*/}
          <LinearGradient
            className="flex-1 p-3 justify-center items-center rounded"
            colors={["#18181B", "#121111"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              numberOfLines={5}
              ellipsizeMode="tail"
              className="text-gray-400 text-center text-2xl italic tracking-wide"
            >
              “{item.description}”
            </Text>
          </LinearGradient>
          {/*<--------------------------------------------------- ICONO DE TIPO DE PUBLICACION (TEXTO) -------------------------------------------------->*/}
          <View className="absolute top-2 right-2 bg-gray-700 rounded-full px-2 py-1">
            <Ionicons name="text" size={16} color="white" />
          </View>
        </View>
      )}
    </Pressable>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={3}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#fff"]}
          tintColor="#fff"
        />
      }
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-white">No hay publicaciones</Text>
        </View>
      }
      contentContainerStyle={posts?.length === 0 && { flexGrow: 1 }}
    />
  );
}
