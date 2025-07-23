// <-------------------------- MODULOS -------------------------->
import { useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
// <------------------------ COMPONENTES ------------------------>
import { View, TextInput, Pressable, Text, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// <------------------------- SERVICIOS ------------------------->

// LIMITE DE IMAGENES PARA SUBIR
const MAX_IMAGES = 5;

/** 
 * @component
 * Componente encargado de permitir al usuario crear una nueva publicación.
 * Administra la descripción y las imágenes seleccionadas, generando un objeto `FormData`
 * que será enviado mediante la función `onSubmit`.
 * 
 * @param {Object} props - Props del componente, provenientes del hook personalizado `usePosts`.
 * @param {function(FormData): Promise<boolean>} props.onSubmit - Funcion de `usePostst` encargada de enviar solicitud para crear publicacion.
 * @param {Boolean} props.loading - Estado global que indica si actualmente se están cargando o creando publicaciones.
 * 
 * @returns  {JSX.Element} Vista de formulario para crear una publicacion.
 */
export default function CreatePost({ onSubmit, loading: globalLoading }) {
  // Estado de tipo texto para almacenar descripcion de publicacion.
  const [description, setDescription] = useState("");
  // Estado de tipo array para almacenar imagenes seleccionadas.
  const [media, setMedia] = useState([]);
  // Estado de envio de datos
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Referencia de input de descripcion para poder hacer .blur()
  const descriptionRef = useRef(null);

  /**
   * @function
   * Funcion encargada de abrir la galeria para seleccionar una imagen.
   */
  const handlePickImage = async () => {
    if (media.length >= MAX_IMAGES) {
      Alert.alert(`Máximo ${MAX_IMAGES} imágenes permitidas`);
      return;
    }
    try {
      // Solicitud de permiso para acceder a la galeria de usuario.
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // Verificacion de permiso para acceder a la galeria
      if (status !== 'granted') {
        Alert.alert("Se necesita permiso para acceder a la galería");
        return;
      }
      // Apertura de galeria con configuracion solo para permitir imagenes y entre otras configuraciones.
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 0.7, allowsMultipleSelection: false });
      // Incorporacion de imagen anadida al estado `media` incorporando su URI.
      if (!result.canceled && result.assets && result.assets.length > 0) { setMedia(prev => [...prev, result.assets[0].uri]) }

    } catch (error) {
      console.error("Error al seleccionar imagen:", error.message);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  /**
   * @function
   * Funcion encargada de eliminar una imagen del array `media` segun su indice.
   * @param {number} index - Indice/key de imagen a eliminar.
   */
  const removeImage = (index) => { 
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * @function
   * Funcion encargada de preparar el objeto FormData con los datos del formulario enviado por el usuario.
   * 
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    // En caso de no tener descripcion ni media(imagenes) no hace nada.
    if (!description.trim() && media.length === 0) return;
    // Seteo del estado `submiting` a true para indicar que se empezo a trabajar(cargar) una nueva publicacion.
    setIsSubmitting(true);
    // Creacion de objeto FormData.
    const formData = new FormData();
    // Incorporacion de estado de description al estado `description`.
    formData.append("description", description);
    // Recorrido e incorporacion de imagenes del estado de imagenes al campo `media`.
    media.forEach((uri, index) => { formData.append("media", { uri, name: `image_${index}.jpg`, type: "image/jpeg" }) });
    // Envio de objeto FormData a traves prop **onSubmit** que se encarga de ejecutar la funcion `handleCreatePost` del hook personalizado usePosts para crear una publicacion.
    const success = await onSubmit(formData);

    // Respuesta exitosa(boolean) de creacion de publicacion.
    if (success) {
      // Reinicio del estado de description.
      setDescription("");
      // Reinicio del estado de media.
      setMedia([]);
      // Eliminacion de foco del campo de texto(si es que estaba activo).
      descriptionRef.current?.blur();
    }
    // Seteo del estado `submiting` a false para indicar que acabo de trabajar/cargar nueva publicacion.
    setIsSubmitting(false);
  };

  // Estado de tipo boolean para deshabilitar inputs/botones durante la carga.
  const isLoading = isSubmitting || globalLoading; // [NOTA]: globalLoading corresponde a la prop `loading` del hook personalizado usePosts.

  return (
    <View className="bg-zinc-900 p-4 mb-2 rounded-xl shadow-md">
      {/*<---------------------------------------------------------- INPUT DESCRIPCION DE PUBLICACION --------------------------------------------------------->*/}
      <TextInput
        ref={descriptionRef}
        placeholder="¿Qué estás pensando?"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
        className="text-base min-h-[80px] text-white"
        editable={!isLoading}
      />

      {/*<----------------------------------------------- VISUALIZADOR DE IMAGENES SELECCIONADAS PARA PUBLICACION ---------------------------------------------->*/}
      {media.length > 0 && (
        <ScrollView horizontal className="my-2">
          {media.map((uri, index) => (
            <View key={index} className="relative mr-2">
              <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
              <Pressable onPress={() => removeImage(index)} disabled={isLoading} className="absolute top-1 right-1 bg-red-600/80 rounded-full w-6 h-6 flex items-center justify-center">
                <MaterialIcons name="close" size={16} color="white" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}

      {/*<------------------------------------------------------------ BOTONES FORMULARIO DE PUBLICACION -------------------------------------------------------->*/}
      <View className="flex-row justify-between items-center pt-2 border-t border-gray-200">
        {/*<------------------------ BOTON PARA AGREGAR IMAGENES A PUBLICA----------------------------->*/}
        <Pressable onPress={handlePickImage} className="p-2" disabled={isLoading}>
          <MaterialIcons name="photo-library" size={24} color="gray" />
        </Pressable>
        {/*<------------------------------- BOTON PARA CREAR PUBLICACION ------------------------------->*/}
        <Pressable onPress={handleSubmit} disabled={isLoading || description.trim() === ""} className={`px-4 py-2 rounded-full ${ !description  ? "bg-gray-400" : "bg-blue-500" }`}>
          {isLoading ? ( <ActivityIndicator color="white" /> ) : ( <Text className="text-white font-medium">Publicar</Text> )}
        </Pressable>
      </View>

    </View>
  );
}
