import React from "react";
import { View, ActivityIndicator } from "react-native";
import PostsGrid from "../../../../components/post/PostsGrid";
import Screen from "../../../../components/Screen";
import { usePosts } from "../../../../hooks/usePosts";

export default function ExploreScreen() {
  const { posts, refreshing, handleRefresh, loading } = usePosts();

  return (
    <Screen className="p-2">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <PostsGrid
          posts={posts}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </Screen>
  );
}
