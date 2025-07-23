// <-------------------------- MODULOS -------------------------->
import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
// <------------------------ COMPONENTES ------------------------>
import Screen from "../../components/Screen";
import CustomAlert from "../../components/common/CustomAlert";
import { View, Text, TextInput, Pressable, ActivityIndicator, Image } from "react-native";
// <------------------------- SERVICIOS ------------------------>
import { register } from "../../services/user.service";

export default function Register() {
  // Estados de inputs de formulario para registro.
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  // Estado para controlar el loading del botón de registro
  const [isLoading, setIsLoading] = useState(false);


  const handlePickImage = async () =>{
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permiso denegado", "Se necesita acceso a la galería");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setProfilePicture({
          uri: asset.uri,
          name: asset.fileName || "profile.jpg",
          type: asset.type || "image/jpeg",
        });
      }

    } catch (error) {
      console.error("Error al seleccionar imagen:", error.message);
    }
  }


  /**
   * Maneja el envio de datos(formato FormData) para registrar usuario
   * @async
   * @function handleRegister
   * @throws {Error} Al fallar la solicitud de registro.
   */
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      // Objeto FormData para enviar datos en formato `formulario web`.
      const formData = new FormData();
      formData.append("name", name);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePicture) {
        console.log("Objeto profilePicture:", profilePicture);
        formData.append("profilePicture", {
          uri: profilePicture.uri,
          name: profilePicture.name || "imagen.jpg",
          type: "image/jpeg"
        });
      }
      
      // Solicitud registro de usuario con formData.
      const response = await register(formData);
      // Alerta personalizada de exito de registro de usuario.
      if (!response.success){ CustomAlert({ title: "Ha ocurrido un problema", message: response.message, buttonText: "Aceptar"})}
      // Alerta personalizada de fallo de registro de usuario.
      else{ CustomAlert({ title: "Registro exitoso", message: response.message, buttonText: "Iniciar sesión", redirectRoute: "/(auth)/login"})}
    } catch (error) {
      console.error("[ERROR]-> register-> handleRegister: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen>
      <View className="h-full flex justify-center items-center bg-black">
        <View className="bg-gray-900 p-8 rounded-xl max-w-md">
          {/* <---------------------------------------------------------- TITULO FORMULARIO ----------------------------------------------------------> */}
          <Text className="text-center text-3xl font-bold text-white mb-6">¿Eres nuevo? Regístrate</Text>
          {/* <----------------------------------------------------------- INPUT DE NOMBRE -----------------------------------------------------------> */}
          <TextInput placeholder="Nombre" value={name} onChangeText={(text) => setName(text)} placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-4 p-3" 
          />
          {/* <---------------------------------------------------------- INPUT DE APELLIDO ----------------------------------------------------------> */}
          <TextInput placeholder="Apellido" value={lastName} onChangeText={(text) => setLastName(text)} placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-4 p-3"
          />
          {/* <---------------------------------------------------------- INPUT DE USERNAME ----------------------------------------------------------> */}
          <TextInput placeholder="Nombre de usuario" value={username} onChangeText={(text) => setUsername(text)} placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-4 p-3" 
          />
          {/* <----------------------------------------------------------- INPUT DE EMAIL -----------------------------------------------------------> */}
          <TextInput placeholder="Correo electrónico" value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-4 p-3" 
          />
          {/* <-------------------------------------------------------- INPUT DE CONTRASENA ---------------------------------------------------------> */}
          <TextInput placeholder="Contraseña" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry placeholderTextColor="#bbb"
            className="bg-gray-700 text-white border-2 border-gray-600 rounded-md mb-6 p-3"
          />
          {/* <----------------------------------------------------- INPUT DE IMAGEN DE PERFIL ------------------------------------------------------> */}
          <Pressable onPress={handlePickImage} className="bg-gray-700 p-3 rounded-md mb-4">
            <Text className="text-white text-center">
              {profilePicture ? "Cambiar foto de perfil" : "Seleccionar foto de perfil"}
            </Text>
          </Pressable>
          {profilePicture?.uri && (
            <View className="items-center mb-4">
              <Image
                source={{ uri: profilePicture.uri }}
                style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
              />
              <Pressable onPress={() => setProfilePicture(null)} className="bg-red-600 px-4 py-2 rounded-md">
                <Text className="text-white font-bold">Quitar imagen</Text>
              </Pressable>
            </View>
          )}
          {/* <---------------------------------------------------------- FOOTER FORMULARIO ----------------------------------------------------------> */}
          <View className="flex-row justify-center gap-2 mb-6">
            <Text className="text-gray-400">¿Ya tienes cuenta?</Text>
            {/*<------------- BOTON PARA IR A INICIAR SESION ------------->*/}
            <Pressable onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-blue-400 font-bold">Inicia sesión</Text>
            </Pressable>
          </View>

          {/*<--------------------------------------------------------- BOTON PARA REGISTRARSE --------------------------------------------------------->*/}
          <Pressable onPress={handleRegister} disabled={isLoading} className={`bg-blue-600 py-6 rounded-md ${isLoading ? "opacity-50" : ""}`}>
            {isLoading ? ( <ActivityIndicator size="small" color="white" />) : ( <Text className="text-white text-center font-bold"> Registrarse</Text>)}
          </Pressable>

        </View>
      </View>
    </Screen>
  );
}
