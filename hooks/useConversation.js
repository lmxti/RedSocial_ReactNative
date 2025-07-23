import { useState, useEffect } from "react";
import { fetchMessages, setupSocketListeners } from "../services/conversation.service";

const useConversation = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [conversationInfo, setConversationInfo] = useState(null);
  
  const loadMessages = async () => {
    if (!conversationId) return;
    const { data } = await fetchMessages(conversationId);
    setMessages(
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    );
  };

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  // Configurar socket para recibir nuevos mensajes
  useEffect(() => {
    if (!conversationId) return;
    const cleanup = setupSocketListeners(conversationId, setMessages);
    return cleanup;
  }, [conversationId]);

  return [messages, setMessages];
};


export default useConversation;