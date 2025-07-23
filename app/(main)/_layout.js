/*--------------------------- MODULOS ---------------------------*/

/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";

/**
 * LAYOUT PRINCIPAL DE RUTAS AUTENTICADAS (app/(main)/_layout.js)
 * Funcionalidades clave:
 *    1. Contenedor de rutas protegidas(requieren autenticacion).
 *    2. Configuracion comun para navegacion en el area autenticada.
 *    3. Manejo de rutas dinamicas y anidadas.
 *
 *  Estructura:
 *    - Stack principal con header oculto por defecto.
 *    - Sub-rutas:
 *      • (tabs): Navegacion inferior (home/explore/profile)
 *      • post/[id]: Pantalla de detalle de publicacion.
 *      • user/[id]: Perfil de usuario publico.
 */
export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      {/*----- Navegacion por (tabs), renderiza (home/explore/profile)-----*/}
      <Stack.Screen name="(tabs)" />
      {/*------------------ Ruta dinamica de "post/[id]" ------------------*/}
      <Stack.Screen
        name="post/[id]"
        options={{
          title: "Publicación",
          headerShown: true,
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="post/comments"
        options={{
          title: "Comentarios",
          headerShown: true,
          headerBackTitle: "Atrás",
          animation: "slide_from_bottom"
        }}
      />
      {/*------------------ Ruta dinamica de "user/[id]" ------------------*/}
      <Stack.Screen
        name="user/[id]"
        options={{
          title: "Perfil",
          headerShown: true,
          headerBackTitle: "Atrás",
        }}
      />
    </Stack>
  );
}
