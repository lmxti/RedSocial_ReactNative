// <-------------------------- MODULOS -------------------------->
import { useRouter } from "expo-router";
import { memo } from 'react';
import { API_BASE_URL, PROFILE_PICTURES_PATH } from "@env";
// <------------------------ COMPONENTES ------------------------>
import { View, Text, Image, Pressable } from "react-native";

// Definición del componente
const UserAvatarComponent = ({ user, size = 40, showName = true }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/(main)/user/${user?._id}`)}
      className="flex-row items-center space-x-2"
    >
      <Image
        className="bg-gray-200"
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={
          user?.profilePicture
            ? {
                uri: `${API_BASE_URL}${PROFILE_PICTURES_PATH}/${user?.profilePicture}`,
              }
            : require("../../assets/icon.png")
        }
      />
      {showName && (
        <View>
          <Text className="font-semibold text-gray-400">{user?.username}</Text>
        </View>
      )}
    </Pressable>
  );
};

// Memoizar el componente
const MemoizedUserAvatar = memo(UserAvatarComponent);

// Exportar el componente memoizado
export default MemoizedUserAvatar;