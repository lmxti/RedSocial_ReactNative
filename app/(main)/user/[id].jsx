import { View, Text, Pressable } from "react-native";
import Screen from "../../../components/Screen";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import PostsGrid from "../../../components/post/PostsGrid";
import { useProfile } from "../../../hooks/useProfile";
import { useLocalSearchParams } from "expo-router";
import { useRouter, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Logout } from "../../../components/Icons";


export default function UserProfile() {
  const { id: userId } = useLocalSearchParams();
  const { profileData, posts, refreshing, onRefresh, loading, isFollowing, toggleFollow, isOwnProfile, handleLogout, handleSendMessage  } = useProfile(userId);
  const navigation = useNavigation();

    useLayoutEffect(() => {
      if (profileData?.username) {
        navigation.setOptions({
          title: `@${profileData.username}`,
          headerRight: () => (
            isOwnProfile && (
              <Pressable onPress={handleLogout} style={{ marginRight: 10 }}>
                <Logout/>
              </Pressable>
            )
          ),
        });
      }
    }, [navigation, profileData?.username, isOwnProfile]);

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Cargando perfil...</Text>
        </View>
      </Screen>
    );
  }

  if (!profileData) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Perfil no encontrado</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ProfileHeader
        profileData={profileData}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        onFollowToggle={toggleFollow}
        onSendMessage={handleSendMessage}
      />
      <View className="border-b-2 border-white my-4" />
      <PostsGrid
        posts={posts}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </Screen>
  );
}
