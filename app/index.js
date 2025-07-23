import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated === undefined) {
    // Muestra un loader mientras se verifica la autenticación
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Redirect href="/(main)/(tabs)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
