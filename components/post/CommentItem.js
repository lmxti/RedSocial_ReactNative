import { memo } from 'react';
import { View, Text } from 'react-native';
import UserAvatar from '../common/UserAvatar';

const CommentItem = memo(({ comment }) => {
  return (
    <View className="mt-2 bg-zinc-800 py-4 px-4 rounded-lg">
      <View className="flex-row items-start space-x-2">
        <UserAvatar user={comment.author} size={32} showName={false} />
        <View className="flex-1">
          <Text className="text-gray-300 font-medium">{comment.author.username}</Text>
          <Text className="text-gray-400 text-sm">{comment.content}</Text>
        </View>
      </View>
    </View>
  );
});

export default CommentItem;