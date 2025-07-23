// <-------------------------- MODULOS -------------------------->
import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
// <------------------------ COMPONENTES ------------------------>
import Screen from "../../../components/Screen";
import { View, ActivityIndicator, ScrollView, FlatList } from "react-native";
// <------------------------- SERVICIOS ------------------------->
import { getPostById } from "../../../services/post.service";
import PostItem from "../../../components/post/PostItem";

export default function PostDetail() {
  const { id: postId } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await getPostById(postId);
      setPost(response);
    } catch (error) {
      console.error("Error cargando el post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00f" />
      </View>
    );
  }

  return (
    <Screen>
      <FlatList
        data={[post]}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </Screen>
  );
}
