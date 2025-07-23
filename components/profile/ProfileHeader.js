import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { API_BASE_URL, PROFILE_PICTURES_PATH } from "@env";

export default function ProfileHeader({
  profileData,
  onEditProfile,
  isOwnProfile = true,
  isLoading = false,
  isFollowing = false,
  onFollowToggle = () => {},
  onSendMessage = () => {}, // Nueva prop
}) {
  if (isLoading) {
    return (
      <View className="flex flex-row gap-4 items-center">
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View>
      <View className="flex flex-row gap-4">
        <View className="flex items-center space-y-2">
          <Image
            source={
              profileData?.profilePicture
                ? {
                    uri: `${API_BASE_URL}${PROFILE_PICTURES_PATH}/${profileData?.profilePicture}`,
                  }
                : require("../../assets/icon.png")
            }
            className="w-24 h-24 rounded-full bg-gray-300"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1">
          <Text className="text-white font-bold text-2xl">
            {`${profileData?.name} ${profileData?.lastName}`}
          </Text>
          <View className="flex flex-row gap-4">
            <Text className="text-white">
              Seguidores: {profileData?.followers?.length || 0}
            </Text>
            <Text className="text-white">
              Seguidos: {profileData?.following?.length || 0}
            </Text>
          </View>
          {profileData?.bio && (
            <Text className="text-white mt-2">{profileData?.bio}</Text>
          )}

          {/* Si es su propio perfil, muestra Editar perfil */}
        </View>
      </View>
          {isOwnProfile ? (
            <View className="flex flex-row gap-2 mt-2">
              <Pressable onPress={onEditProfile} className="border border-white rounded px-8 py-2 bg-zinc-800 w-full">
                <Text className="text-white text-center font-semibold">
                  Editar perfil
                </Text>
              </Pressable>
            </View>
          ) : (
            // Si no es su propio perfil, muestra Seguir/Dejar de seguir y Enviar mensaje
            <View className="flex-row gap-2 mt-2 justify-between">
              <Pressable onPress={onSendMessage} className="border border-white rounded px-3 py-2 bg-zinc-800 flex-1" >
                <Text className="text-white text-center font-semibold"> Enviar mensaje </Text>
              </Pressable>
              <Pressable onPress={onFollowToggle} className={`border rounded px-3 py-2 flex-1 ${ isFollowing ? "border-white bg-black" : "border-black bg-white" }`} >
                <Text className={`text-center font-semibold ${ isFollowing ? "text-white" : "text-black" }`} >
                  {isFollowing ? "Dejar de seguir" : "Seguir"}
                </Text>
              </Pressable>
            </View>
          )}
    </View>
  );
}
