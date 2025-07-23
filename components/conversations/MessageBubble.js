import { View, Text} from "react-native";

/**
 * Muestra un mensaje en la conversación.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Mensaje recibido.
 * @param {string} props.userId - ID del usuario actual.
 */
const MessageBubble = ({ item, userId }) => {
    const isCurrentUser = item.sender._id === userId || item.sender === userId;
  
    return (
      <View
        className={`max-w-[80%] p-3 rounded-lg my-1 ${
          isCurrentUser
            ? "bg-blue-500 self-end rounded-tr-none"
            : "bg-gray-200 self-start rounded-tl-none"
        }`}
      >
        <Text className={isCurrentUser ? "text-white" : "text-black"}>
          {item.text}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isCurrentUser ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };
  
  export default MessageBubble;