import { useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { commentPost } from "../../services/post.service";

const InputComment = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("post", postId);

      const { success, data } = await commentPost(formData);
      if (success) {
        onCommentAdded(data);
        setContent("");
      }
    } catch (err) {
      console.error("Error al comentar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-row items-end p-2 mt-2">
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Escribe un comentario..."
        placeholderTextColor="#888"
        className="flex-1 text-white px-3 py-2 text-sm bg-zinc-800 rounded-xl max-h-24 min-h-10"
        multiline
        scrollEnabled
        style={{ textAlignVertical: "top" }} // este estilo es necesario para que el texto inicie arriba
      />
      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        className="ml-2 bg-gray-700 px-4 py-2 rounded-full"
      >
        <Text className="text-blue-400 font-bold text-sm">
          {loading ? "..." : "Enviar"}
        </Text>
      </Pressable>
    </View>
  );
};

export default InputComment;
