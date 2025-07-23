import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import InputComment from "../../../components/post/InputComment";
import { getCommentsPostById } from "../../../services/post.service";
import CommentItem from "../../../components/post/CommentItem";

export default function PostComments() {
  const { id } = useLocalSearchParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getCommentsPostById(id);
      if (response.success) {
        setComments(response.data.data);
      } else {
        console.warn("Error al obtener comentarios:", response.message);
      }
    } catch (error) {
      console.error("Error al cargar comentarios", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchComments();
  }, []);

  const handleNewComment = (newComment) => {
    setComments(prev => {
      const existing = prev.find(c => c._id === newComment._id);
      if (existing) return prev;
      return [newComment, ...prev];
    });
  };

  const renderComment = useCallback(({ item }) => (
    <CommentItem 
      key={item._id}
      comment={item}
    />
  ), []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-zinc-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 p-4">
          {loading ? (
            <ActivityIndicator size="large" color="#fff" className="mt-6" />
          ) : (
            <FlatList
              data={comments}
              initialNumToRender={5}
              windowSize={5}
              maxToRenderPerBatch={5}
              keyExtractor={(item) => item._id}
              renderItem={renderComment}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
              ListEmptyComponent={
                <Text className="text-white text-center mt-4">
                  No hay comentarios aún.
                </Text>
              }
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}

          <InputComment postId={id} onCommentAdded={handleNewComment} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
