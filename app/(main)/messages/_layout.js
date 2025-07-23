/*--------------------------- MODULOS ---------------------------*/
import { useRouter } from "expo-router";
/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * LAYOUT DE MENSAJERIA (app/(main)/messages/_layout.js)
 * Funcionalidades clave:
 *    1. Maneja la navegacion entre:
 *        - Listado de conversaciones(index).
 *        - Pantalla de conversacion individual de forma dinamica ([conversation])
 *
 * Jerarquía de Rutas:
 *    - /messages/ → Listado de conversaciones
 *    - /messages/[id] → Chat específico
 */
export default function MessagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        animation: "slide_from_right",
      }}
    >
      {/*------------ Pantalla principal "index", lista de conversaciones ------------*/}
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Mensajes",
          headerBackTitle: "Atrás",
          headerLeft: () => {
            const router = useRouter();
            return (
              <TouchableOpacity className="mr-2" onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            );
          },
        }}
      />
      {/*-------------- Ruta dinamica de conversacion "/[conversation]"-------------*/}
      <Stack.Screen
        name="[conversation]"
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "Atrás",
          // headerLeft: () => {
          //   const router = useRouter();
          //   return (
          //     <TouchableOpacity onPress={() => router.back()}>
          //       <Ionicons name="arrow-back" size={24} color="white" />
          //     </TouchableOpacity>
          //   );
          // },
        }}
      />
    </Stack>
  );
}
