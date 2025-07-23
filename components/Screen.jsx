import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Screen({ children }) {
  return (
    <View className="flex-1 bg-black p-4">
      <StatusBar style="light" />
      {children}
    </View>
  );
}
