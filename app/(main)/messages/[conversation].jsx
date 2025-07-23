// <-------------------------- MODULOS -------------------------->
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";
// <------------------------ COMPONENTES ------------------------>
import Screen from "../../../components/Screen";
import MessageBubble from "../../../components/conversations/MessageBubble"; // 🔹 Importa el nuevo componente
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from "react-native";
// <------------------------- SERVICIOS ------------------------->
import { sendMessage } from "../../../services/conversation.service";
// <------------------------- HOOKS ------------------------->
import useConversation from "../../../hooks/useConversation";
import { useNavigation, useRouter } from "expo-router";

import { API_BASE_URL, PROFILE_PICTURES_PATH } from "@env";
import { Ionicons } from "@expo/vector-icons";



export default function ConversationDetail() {
  // Desctructuracion de estado de autenticacion de usuario.
  const { user } = useSelector((state) => state.auth);
  // Destructuracion de id de conversacion para obtener mensajes.
  const { conversation: conversationId } = useLocalSearchParams();
  // Estado que almacena los mensajes de conversacion.
  const [messages, setMessages] = useConversation(conversationId);
  // Estado que almacena el nuevo mensaje a enviar.
  const [newMessage, setNewMessage] = useState("");
  // Referencia null para utilizar en el FlatList.
  const flatListRef = useRef(null);

  const navigation = useNavigation();
  const router = useRouter();

  const [otherUser, setOtherUser] = useState(null);
  
  useEffect(() => {
    if (messages.length > 0) {
      const other = messages.find(m => m.sender._id !== user.id)?.sender;
      if (other) setOtherUser(other);
    }
  }, [messages]);

  useLayoutEffect(() => {
    if (!otherUser) return;
  
    navigation.setOptions({
      headerLeft: () => (
        <View className="flex-row items-center ">
          {/* Botón de volver */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3 bg-zinc-700 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
  
          {/* Avatar y nombre como link al perfil */}
          <TouchableOpacity
            onPress={() => router.push(`/(main)/user/${otherUser._id}`)}
            className="flex-row items-center space-x-2"
          >
            <Image
              source={{ uri: `${API_BASE_URL}${PROFILE_PICTURES_PATH}/${otherUser?.profilePicture}` }}
              className="w-9 h-9 rounded-full"
            />
            <Text className="text-lg font-semibold text-white">
              {otherUser.name}
            </Text>
          </TouchableOpacity>
        </View>
      )
    });
  }, [otherUser]);
  
  // Manejo de el envio de mensajes en la conversacion actual. 
  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(conversationId, user.id, newMessage);
      setNewMessage("");
    }
  };

  return (
    <Screen className="p-4">
      {/* Lista de mensajes */}
      <FlatList
        data={[...messages].reverse()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MessageBubble item={item} userId={user.id} />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 25 }}
        inverted
        ref={flatListRef}
      />

      {/* Input para escribir mensajes */}
      <View className="flex-row items-center">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSend}
          placeholder="Escribe un mensaje..."
          className="flex-1 p-3 border border-gray-300 rounded-full bg-white"
          placeholderTextColor="#9ca3af"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 bg-blue-500 p-3 rounded-full"
        >
          <Text className="text-white font-bold">Enviar</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
