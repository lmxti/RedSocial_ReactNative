import { View } from "react-native";

const CommentSkeleton = () => {
  return (
    <View className="flex-row items-start mb-4 p-2">
      <View className="bg-zinc-700 rounded-full w-10 h-10" />
      <View className="ml-2 flex-1">
        <View className="bg-zinc-700 w-24 h-4 rounded-full mb-2" />
        <View className="bg-zinc-700 w-full h-3 rounded-full mb-1" />
        <View className="bg-zinc-700 w-3/4 h-3 rounded-full" />
      </View>
    </View>
  );
};

export default CommentSkeleton;