// <------------------------- SERVICIOS ------------------------->
import axios from "./root.service";
import { socket } from "./socket.service";


export const fetchConversations = async() =>{
  try {
    const response = await axios.get(`chat/conversation`);
    return {
      success: true,
      data: response.data.data,
      message: "Conversaciones obtenidas con exito"
    }
  } catch (error) {
    console.log(error);
    
  }
}

export const fetchMessages = async (conversationId) => {
  try {
    const response = await axios.get(`/chat/conversation/${conversationId}`);
    return {
      success: true,
      data: response.data.data,
      message: "Conversaciones obtenidas con exito"
    }
    
  } catch (err) {
    console.log("[ERROR]: -> fetchMessages: ", error);
    return [];
  }
};




export const startConversation = async(targetUserId) =>{
  try {
    const response = await axios.post(`chat/conversation/create`, { targetUserId });
    
    return {
      success: true,
      data: response.data.data,
      message: "Conversacion obtenida con exito",
      conversationId: response.data.data._id
    }

  } catch (error) {
    console.log("[ERROR]: ->startConversation: ", error);

    return {
      success: false,
      message: "Ocurrio un error "
    }
    
  }
}

/**
 * Configura los listeners del socket para recibir nuevos mensajes en una conversación.
 *
 * @param {string} conversationId - ID de la conversación a la que se unirá el socket.
 * @param {function} setMessages - Función para actualizar el estado de los mensajes.
 * @returns {function} Función de limpieza que remueve el listener del socket.
 */
export const setupSocketListeners = (conversationId, setMessages) => {
  // Normalizacion de mensaje nuevo
  const handleNewMessage = (message) => {
    const normalizedMessage = {
      ...message,
      sender:
        typeof message.sender === "string"
          ? { _id: message.sender }
          : message.sender,
    };
    // Incorporacion de nuevo mensaje al estado de mensajes
    setMessages((prev) => [...prev, normalizedMessage]);
  };

  // Evento de socket para unirse a la conversacion.
  socket.emit("joinConversation", conversationId);
  // Listener del evento "newMessage" emitido por el backend al recibir un nuevo mensaje.
  socket.on("newMessage", handleNewMessage);

  // Evento de socket para remover el listener al salir de la pantalla.
  return () => {
    socket.off("newMessage", handleNewMessage);
  };
};

/**
 * Envía un mensaje a través del socket en una conversación específica.
 *
 * @param {string} conversationId - ID de la conversación a la que se enviará el mensaje.
 * @param {string} senderId - ID del remitente del mensaje.
 * @param {string} text - Contenido del mensaje a enviar.
 */
export const sendMessage = (conversationId, senderId, text) => {
  socket.emit("sendMessage", {
    conversationId,
    senderId,
    text,
  });
};

/**
 * Configura los listeners del socket para recibir actualizaciones de conversaciones.
 *
 * @param {function} setConversations - Función para actualizar el estado de las conversaciones.
 * @returns {function} Función de limpieza que remueve el listener del socket.
 */
export const setupConversationListeners = (setConversations) => {
  const handleNewMessage = (message) => {
    setConversations((prevConversations) => {
      return prevConversations.map((conversation) => {
        if (conversation._id === message.conversationId) {
          return {
            ...conversation,
            lastMessage: message,
            updatedAt: new Date(),
          };
        }
        return conversation;
      });
    });
  };

  socket.on("newMessage", handleNewMessage);

  return () => {
    socket.off("newMessage", handleNewMessage);
  };
};
