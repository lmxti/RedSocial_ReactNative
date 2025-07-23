/*--------------------------- MODULOS ---------------------------*/

/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";

/**
 * LAYOUT DE EXPLORACION (app/(main)/(tabs)/explore/_layout.js)
 * Funcionalidades clave:
 *    1. Contenedor para la pantalla de exploracion(explorer)
 *
 */
export default function ExploreLayout() {
  return (
    <Stack>
      {/*----------------- Pantalla principal(index) de explorer-----------------*/}
      <Stack.Screen name="index" options={{ headerShown: false, title: "Explorar" }} />
    </Stack>
  );
}
