// <-------------------------- MODULOS -------------------------->
import { memo, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { API_BASE_URL, POST_MEDIA_PATH} from "@env"

// <------------------------ COMPONENTES ------------------------>
import { View, Text, Image, Pressable, useWindowDimensions, FlatList, ActionSheetIOS, Platform, Alert } from "react-native";
import UserAvatar from "../common/UserAvatar";
import { MaterialIcons } from "@expo/vector-icons";
// <------------------------- SERVICIOS ------------------------->
import { toggleLikePost } from "../../services/post.service";
import { useSelector } from "react-redux";

/**
 * @component
 * Componente `memoizado` encargado de renderizar una publicacion de forma individual
 * incluyendo sus datos como autor, descripcion y media(carrousel de imagen(nes) y opciones de interaccion).
 * 
 * @param {Objetc} props - Props del componente.
 * @param {Object} props.post - Objeto con datos de publicacion (autor, media, descripción, etc.) proveniente del componente `PostList`.
 * 
 * @returns {JSX.Element} Vista de una publicacion individual
 */
const PostItem = memo(({ post }) => {
  // Inicializacion de enrutador para navegación
  const router = useRouter();
  // Estado de indice de imagen activa para el carrusel.
  const [activeIndex, setActiveIndex] = useState(0);
  // Dimensiones de ventana para calcular ancho de imagen
  const { width: screenWidth } = useWindowDimensions();
  // Referencia de item de carrusel y permitir desplazamiento manual
  const flatListRef = useRef(null);
  
  // Calculo de ancho de cada imagen restando margenes laterales.
  const imageWidth = screenWidth - 32; 
  const imageHeight = imageWidth * (3 / 4);

  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(currentUser?.id));
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);

  const handleLike = async () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);

    try {
      const { success } = await toggleLikePost(post._id);
      if (!success) {
        setIsLiked(!newIsLiked);
        setLikeCount(prev => newIsLiked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      setIsLiked(!newIsLiked);
      setLikeCount(prev => newIsLiked ? prev - 1 : prev + 1);
      console.error(`[ERROR] -> PostItem -> handleLike: ${error.message}, [${error.status}]`, );
    }
  };

  {/*<------------------------------------------------- FUNCIONES DE CARROUSEL ------------------------------------------------>*/}
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0]?.index !== undefined) {
      setActiveIndex(viewableItems[0].index)
    }
  };

  // Boton para avanzar a la siguiente imagen.
  const goToNextImage = () => {
    if (activeIndex < post.media.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true })
    }
  };
  // Boton para retroceder a la imagen anterior.
  const goToPrevImage = () => {
    if (activeIndex > 0) { 
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1, animated: true }) 
    }
  };

  return (
    <View className="bg-zinc-900 mb-3 rounded-xl shadow-md overflow-hidden">
      <View className="p-4">
        {/*<---------------------------------------------------------- HEADER DE PUBLICACION --------------------------------------------------------->*/}
        <View className="flex-row items-center justify-between mb-3">
          <Pressable onPress={() => router.push(`/(main)/user/${post?.author._id}`)}>
          <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center space-x-2">
                  {/*<---------------------------------------------------------- AUTOR DE PUBLICACION --------------------------------------------------------->*/}
                  <UserAvatar user={post.author} size={40} showName={false} />
                  {/*<---------------------------------------------------------- NOMBRE DE AUTOR DE PUBLICACION --------------------------------------------------------->*/}
                  <View className="flex-col">
                    <Text className="font-semibold text-gray-400">{post.author?.username}</Text>
                    {/*<---------------------------------------------------------- FECHA DE PUBLICACION --------------------------------------------------------->*/}
                    <Text className="text-gray-500 text-xs">{new Date(post?.createdAt).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}</Text>
                  </View>
              </View>
          </View>
          </Pressable>
          <MaterialIcons name="more-vert" size={20} color="#666" />
        </View>

        {/*<---------------------------------------------------------------- DESCRIPCION PUBLICACION --------------------------------------------------------------->*/}
        {post?.description && (
          <Pressable onPress={()=> router.push(`/(main)/post/${post?._id}`)} className="mb-3">
            <Text className="text-gray-200 text-base leading-5"> {post?.description}</Text>
          </Pressable>
        )}
      </View>

      {/*<---------------------------------------------------------------- VISUALIZADOR DE IMAGENES --------------------------------------------------------------->*/}
      {post?.media?.length > 0 && (
        <View className="relative mx-4 mb-3">
          <FlatList
            className="rounded-xl overflow-hidden"
            // Referencia de item para controlar el scroll de forma manual.
            ref={flatListRef} 
            // Datos de carrousel, arreglo con URL's de imagenes.
            data={post.media}
            // Renderizado de cada item(imagen) de forma individual(carrousel).
            renderItem={({ item }) => ( 
              <View style={{ width: imageWidth, height: imageHeight,  }}>
              <Image
                source={{ uri: `${API_BASE_URL}${POST_MEDIA_PATH}/${item}`}}
                style={{ width: "100%", height: "100%", borderRadius: 12 }}
                resizeMode="cover"
                className="bg-gray-100"
              />
            </View>
          )}
            // Clave unica para cada item de FlatList.
            keyExtractor={(_, index) => `media-${index}`}
            // Desplazamiento FlatList de forma horizontal.
            horizontal={post.media.length > 1} 
            // Paginado FlatList.
            pagingEnabled={post.media.length > 1}
            // Tamano de cada pagina.
            snapToInterval={imageWidth + 20}
            // Alineacion de contenido FlatList.
            snapToAlignment="start"
            // Velocidad de desaceleracion de desplazamiento.
            decelerationRate="fast"
            // Visualizacion de scroll horizontal.
            showsHorizontalScrollIndicator={false}
            // Evento que se activa al cambiar/scrollear de un item a un nuevo item.
            onViewableItemsChanged={onViewableItemsChanged}
            // Porcentaje de visibilidad de item dentro de FlatList.
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            // Estilo de contenedor del `contenido` de FlatList (no al FlatList en si).
            contentContainerStyle={{  }}
            // Indice inicial FlatList al cargar por primera vez.
            initialScrollIndex={0}
            // Optimizacion de calculo y posicion de cada item en FlatList.
            getItemLayout={(data, index) => ({   length: imageWidth + 20, offset: (imageWidth + 20) * index,index })}
            
          />

          {/*<----------------------------------------------------------- INDICE DE CARROUSEL DE IMAGENES ---------------------------------------------------------->*/}
          {post.media.length > 1 && (
            <View className="absolute bottom-3 left-0 right-0 flex-row justify-center">
              {post.media.map((_, index) => (
                <View key={index} className={`w-2.5 h-2.5 mx-1 rounded-full ${activeIndex === index ? "bg-white" : "bg-gray-400"}`}/>
              ))}
            </View>
          )}

          {/*<--------------------------------------------------- BOTONES DE NAVEGACION DE CARROUSEL DE IMAGENES -------------------------------------------------->*/}
          {post.media.length > 1 && ( 
            <>
              {activeIndex > 0 && (
                <Pressable  onPress={goToPrevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1">
                  <MaterialIcons name="chevron-left" size={24} color="white" />
                </Pressable>
              )}
              
              {activeIndex < post.media.length - 1 && (
                <Pressable  onPress={goToNextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 rounded-full p-1">
                  <MaterialIcons name="chevron-right" size={24} color="white" />
                </Pressable>
              )}
            </>
          )}
        </View>
      )}


      {/*<----------------------------------------------------------------- FOOTER DE PUBLICACION ---------------------------------------------------------------->*/}
      <View className="flex-row justify-around border-t border-gray-700 py-4 px-4">
        <Pressable onPress={handleLike} className="items-center">
          <MaterialIcons  name={isLiked ? "favorite" : "favorite-border"}  size={20}  color={isLiked ? "#ff0000" : "#ccc"}/>
          <Text className="text-gray-400 text-xs mt-1">
            {likeCount} Me gusta
          </Text>
        </Pressable>

        <Pressable className="items-center" onPress={() => router.push({ pathname: "/post/comments", params: { id: post?._id }})}>
        <MaterialIcons name="chat-bubble-outline" size={20} color="#ccc" />
        <Text className="text-gray-400 text-xs mt-1">{post?.comments.length} Comentarios</Text>
      </Pressable>

        <Pressable className="items-center">
          <MaterialIcons name="share" size={20} color="#ccc" />
          <Text className="text-gray-400 text-xs mt-1">Compartir</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default PostItem;