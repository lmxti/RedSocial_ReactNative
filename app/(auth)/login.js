// <-------------------------- MODULOS -------------------------->
import { useState } from "react";
import { router } from "expo-router";
// <------------------------ COMPONENTES ------------------------>
import Screen from "../../components/Screen";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import CustomAlert from "../../components/common/CustomAlert";
// <------------------------- SERVICIOS ------------------------->
import { login } from "../../services/auth.service";

export default function Login() {
  // Estado de inputs de formulario para iniciar sesion.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Estado para controlar el loading del boton de inicio de sesion.
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Maneja el envio del formulario para iniciar sesion
   * @async
   * @function handleLogin
   * @throws {Error} Al fallar la solicitud de inicio de sesion.
   */
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Solicitud de inicio de sesion con datos de formulario.
      const response = await login({ username, password });
      // Alerta personalizada de fallo de inicio de sesion.
      if(!response.success) {  CustomAlert({ title: "Problema al intentar iniciar sesión", message: response.message, buttonText: "Aceptar" })}
    } catch (error) {
      console.log("[ERROR]-> login-> handleLogin: ",error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <View className="h-full flex justify-center items-center bg-black">
        <View className="bg-gray-900 p-8 rounded-xl max-w-md">
          {/* <---------------------------------------------------------- TITULO FORMULARIO ----------------------------------------------------------> */}
          <Text className="text-center text-xl font-bold text-white mb-6">¡Hola! Bienvenido</Text>
          {/* <----------------------------------------------------------- INPUT DE NOMBRE -----------------------------------------------------------> */}
          <TextInput placeholder="Nombre de usuario" value={username} onChangeText={(text) => setUsername(text)} placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-4 p-3"
          />
          {/* <-------------------------------------------------------- INPUT DE CONTRASENA ---------------------------------------------------------> */}
          <TextInput placeholder="Contraseña" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-6 p-3"
          />
          {/* <---------------------------------------------------------- FOOTER FORMULARIO ----------------------------------------------------------> */}
          <View className="flex-row justify-center gap-2 mb-6">
            <Text className="text-gray-400">¿No tienes cuenta?</Text>
            {/*<------------- BOTON PARA IR A REGISTRO ------------->*/}
            <Pressable onPress={() => router.replace("/(auth)/register")}>
              <Text className="text-blue-400 font-bold">Regístrate</Text>
            </Pressable>
          </View>
          {/*<------------------------------------------------------- BOTON PARA INICIAR SESION ------------------------------------------------------->*/}
          <Pressable onPress={handleLogin} disabled={isLoading} className={`bg-blue-600 py-6 rounded-md ${ isLoading ? "opacity-50" : ""}`}>
            {isLoading ? (<ActivityIndicator size="small" color="white" />) : (<Text className="text-white text-center font-bold">Iniciar sesión</Text>)}
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
