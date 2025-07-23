import axios from "./root.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";
import { loginSuccess, logoutSuccess } from "../redux/authSlice";
import store from "../redux/store";

export const login = async ({ username, password }) => {
  try {
    const response = await axios.post("auth/login", { username, password });
    const { data } = response;

    if (response.status === 200) {
      const { username, role, id } = jwtDecode(data.data.accessToken);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ username, role, id })
      );
      await AsyncStorage.setItem("jwt-auth", data.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.accessToken}`;
      store.dispatch(
        loginSuccess({
          user: { username, role, id },
          token: data.data.accessToken,
        })
      );
    }
    return {
      success: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    console.log("[ERROR]: No se pudo iniciar sesion: ", error);
    return {
      success: false,
      message: error.response?.data?.message,
    };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("jwt-auth");
    await AsyncStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    store.dispatch(logoutSuccess());
    // router.replace('/login');
  } catch (error) {
    console.log("[ERROR] Error al cerrar sesión: ", error);
  }
};
