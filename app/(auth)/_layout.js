/*--------------------------- MODULOS ---------------------------*/
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
/*------------------------- COMPONENTES -------------------------*/
import { Stack } from "expo-router";
// <------------------------- SERVICIOS ------------------------->

/*---------------------------- REDUX ----------------------------*/
import { useSelector } from "react-redux";

/**
 * LAYOUT DE AUTENTICACION (app/(auth)/_layout.js)
 * Funcionalidades clave:
 *    1. Maneja las rutas publicas (login/register).
 *    2. Protege el acceso a rutas `auth` cuando se esta autenticado.
 *    3. Monitorea el estado de autenticacion con Redux
 */
export default function AuthLayout() {
  // Inicializacion de objeto router para manipular navegacion.
  const router = useRouter();
  // Lista de segmentos de URL actual (auth) -> login.js y register.js
  const segments = useSegments();
  // Estado de autenticacion `isAuthenticated` desde redux utilizando state.auth.
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Manejo de redirecciones
  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      router.replace("/(main)/(tabs)/home"); 
    }
  }, [segments, isAuthenticated]);

  // Estructura de navegacion de (auth)
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        
      }}
    >
      {/*------------------ Pantalla de "login" ------------------*/}
      <Stack.Screen
        name="login"
        options={{ headerShown: true, headerTitle: "Inicia sesion" }}
      />
      {/*----------------- Pantalla de "register" ----------------*/}
      <Stack.Screen
        name="register"
        options={{ headerShown: true, headerTitle: "Registro" }}
      />
    </Stack>
  );
}
