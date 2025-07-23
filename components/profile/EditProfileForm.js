import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useEditProfile } from "../../hooks/useEditProfile";
import * as ImagePicker from "expo-image-picker";
import { API_BASE_URL, PROFILE_PICTURES_PATH } from "@env";

export default function EditProfileForm({ initialData }) {
  const { form, handleChange, handleSubmit, loading, error } = useEditProfile(initialData);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Se necesita permiso para acceder a la galería");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      handleChange("profilePicture", selectedAsset); // Guardamos el asset completo para usar su uri y type
    }
  };

  return (
    <KeyboardAvoidingView
      // style={{ flex: 1 }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajustar comportamiento según plataforma
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View className="items-center">
            <Pressable onPress={pickImage}>
              <Image
                className="bg-gray-500"
                style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                source={
                  form?.profilePicture?.uri
                    ? { uri: form.profilePicture.uri }
                    : form?.profilePicture && typeof form.profilePicture === "string"
                    ? { uri: `${API_BASE_URL}${PROFILE_PICTURES_PATH}/${form.profilePicture}` }
                    : require("../../assets/icon.png")
                }
                resizeMode="cover"
              />
            </Pressable>
          </View>

          <Text className="text-gray-400 mb-1">Nombre</Text>
          <TextInput
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white mb-4"
          />

          <Text className="text-gray-400 mb-1">Usuario</Text>
          <TextInput
            value={form.username}
            onChangeText={(text) => handleChange("username", text)}
            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white mb-4"
          />

          <Text className="text-gray-400 mb-1">Biografía</Text>
          <TextInput
            value={form.bio}
            onChangeText={(text) => handleChange("bio", text)}
            multiline
            className="p-3 border border-gray-600 rounded-lg bg-gray-800 text-white mb-6"
          />

          {error && <Text className="text-red-500 mb-2">{error}</Text>}

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 p-3 rounded-lg items-center"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold">Guardar cambios</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
