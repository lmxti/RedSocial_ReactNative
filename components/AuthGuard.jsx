import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSegments, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSuccess } from "../redux/authSlice";
import { View, ActivityIndicator } from "react-native";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const segments = useSegments();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Nuevo estado

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsCheckingAuth(true);

      const token = await AsyncStorage.getItem("jwt-auth");
      const storedUser = await AsyncStorage.getItem("user");

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(loginSuccess({ user: parsedUser, token }));
      }

      setIsCheckingAuth(false); // Finaliza la verificación
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;
  
    const inAuthGroup = segments[0] === "(auth)";
    const currentRoute = segments.join("/");
  
    if (!isAuthenticated) {
      if (!["(auth)/login", "(auth)/register"].includes(currentRoute)) {
        console.log("🔄 Redirigiendo a login...");
        router.replace("/(auth)/login");
      }
    } else if (isAuthenticated && inAuthGroup) {
      console.log("✅ Usuario autenticado, redirigiendo a home...");
      router.replace("/(main)/(tabs)/home");
    }
  }, [segments, isAuthenticated, isCheckingAuth]);

  // Muestra un loader durante la verificación inicial
  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

export default AuthGuard;
