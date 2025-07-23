/*--------------------------- MODULOS ---------------------------*/

/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";

/**
 * LAYOUT DE INICIO(FEED) (app/(main)/(tabs)/_layout.js)
 * Funcionalidades clave:
 *    1. Maneja la navegacion para:
 *        -Feed principal(index)
 *        - Detalle de publicacion ([post])
 */
export default function HomeLayout() {
  return (
    <Stack>
      {/*------------------ Pantalla de "inicio(feed)" ------------------*/}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
