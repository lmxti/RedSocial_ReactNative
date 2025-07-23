import { useState } from "react";
import { updateUser } from "../services/user.service";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";


export function useEditProfile(initialValues) {
  const router = useRouter();
  const [form, setForm] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imageChanged, setImageChanged] = useState(false);

  const handleChange = (field, value) => {
    if (field === "profilePicture" && value?.uri) {
      setImageChanged(true);
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = async () => {
    const formData = new FormData();
  
    formData.append("name", form.name);
    formData.append("lastName", form.lastName);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("bio", form.bio || "");
  
    if (imageChanged && form.profilePicture && form.profilePicture.uri) {
      const fileUri = form.profilePicture.uri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
      if (fileInfo.exists) {
        console.log("Procesando nueva imagen seleccionada");
        const fileName = fileUri.split("/").pop();
        formData.append("profilePicture", {
          uri: fileUri,
          name: fileName,
          type: "image/jpeg"
        });
      }
    }
  
    setLoading(true);
    try {
      const response = await updateUser(formData);
      if (response?.success) {
        router.back();
      } else {
        setError(response?.message || "Error al actualizar perfil");
      }
    } catch (error) {
      console.log("Error detallado:", error);
      setError(`Error al actualizar perfil: ${error?.message || "desconocido"}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
