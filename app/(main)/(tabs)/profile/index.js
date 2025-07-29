import { View, Pressable, Text } from "react-native";
import Screen from "../../../../components/Screen";
import ProfileHeader from "../../../../components/profile/ProfileHeader";
import PostsGrid from "../../../../components/post/PostsGrid";
import { useProfile } from "../../../../hooks/useProfile";

import { useRouter, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";

import { Logout } from "../../../../components/Icons";

export default function Profile() {
  const router = useRouter();
  const { profileData, posts, refreshing, onRefresh, handleLogout, isOwnProfile } = useProfile();

  const handleEditProfile = () => {
    router.push({ pathname: "/(main)/(tabs)/profile/edit", params: { id: profileData._id } });
  };

  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    if (profileData?.username) {
      navigation.setOptions({
        title: `@${profileData.username}`,
        headerRight: () => 
          isOwnProfile && (
            <Pressable className="bg-zinc-900 rounded-full px-4 py-2" onPress={handleLogout} >
              <Logout/>
            </Pressable>
        ),
      });
    }
  }, [navigation, profileData?.username, isOwnProfile]);
  

  return (
    <Screen>
      <ProfileHeader
        profileData={profileData}
        onEditProfile={isOwnProfile ? handleEditProfile : null}
        onLogout={isOwnProfile ? handleLogout : null}
        isOwnProfile={isOwnProfile}
      />
      
      
      <View className="border-b-2 border-zinc-500 my-4" />
      <PostsGrid posts={posts} refreshing={refreshing} onRefresh={onRefresh} />
    </Screen>
  );
}
