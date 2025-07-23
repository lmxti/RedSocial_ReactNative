import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import { fetchConversations, setupConversationListeners } from "../../../services/conversation.service";
import { API_BASE_URL, PROFILE_PICTURES_PATH } from "@env";


export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  

  const getConversations = async() =>{
    try {
      const {success, data, message } = await fetchConversations();
      if(success){
        setConversations(data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getConversations();
  }, [user.id]);

  // Configurar los listeners para actualizar las conversaciones cuando se recibe un nuevo mensaje
  useEffect(() => {
    const cleanup = setupConversationListeners(setConversations);
    return cleanup;
  }, []);

  // Función para obtener el otro participante
  const getOtherParticipant = (participants) => {
    const otherParticipant = participants.find((p) => p._id !== user.id);
    return otherParticipant || { username: "Usuario desconocido" };
  };

  return (
    <Screen>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const otherUser = getOtherParticipant(item.participants);
          const lastMessageText = (user.id === item.lastMessage?.sender._id  ?  `Tu: ${item.lastMessage?.text}` : (`${item.lastMessage?.text || ""}`));
          const updatedTime = new Date(item.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        
          return (
            <TouchableOpacity
              className="p-4 bg-zinc-800 rounded-lg border-b-2 border-zinc-700 mb-2"
              onPress={() => router.push(`/messages/${item._id}`)}
              // style={{ padding: 15, borderBottomWidth: 1, backgroundColor: "#121111", borderRadius: 10 }}
            >
              <View className="flex flex-row gap-2">
                <Image className="w-10 h-10 rounded-full"
                  source={ otherUser.profilePicture
                      ? { uri: `${API_BASE_URL}${PROFILE_PICTURES_PATH}/${otherUser?.profilePicture}`}
                      : require("../../../assets/icon.png")
                  }
                />
                <View className="flex-1">
                  <Text className="text-white font-bold text-lg">
                    {`${otherUser.name} ${otherUser.lastName}`}
                  </Text>
                  <View className="flex flex-row justify-between">
                    <Text className="text-gray-400 flex-1 mr-2" numberOfLines={1}>
                      {lastMessageText}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {updatedTime}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
}
