/*--------------------------- MODULOS ---------------------------*/

/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";

/**
 * LAYOUT DE PERFIL (app/(main)/(tabs)/profile/_layout.js)
 * Funcionalidades clave:
 *    1. Maneja lo que es la navegacion en el area del perfil de usuario loggeado:
 *        - Pantalla/Vista principal del perfil(index).
 *        - Pantalla/Vista de edicion de perfil(edit).
 */
export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        animation: "slide_from_right",
      }}
    >
      {/*------------ Pantalla principal "index", perfil de usuario ------------*/}
      <Stack.Screen
        name="index"
        options={{
          title: "Mi Perfil",
        }}
      />
      {/*------------ Pantalla para la edicion del perfil de usuario ------------*/}
      <Stack.Screen
        name="edit"
        options={{
          title: "Editar perfil",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
