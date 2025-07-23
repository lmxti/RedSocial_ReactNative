/*--------------------------- MODULOS ---------------------------*/
import { useState, useEffect } from "react";
/*---------------------------- REDUX ----------------------------*/
import store from "../redux/store";
import { Provider } from "react-redux";
/*------------------------- COMPONENTES -------------------------*/
import { View, ActivityIndicator } from "react-native";
import { Slot } from "expo-router";
import AuthGuard from "../components/AuthGuard";
import Screen from "../components/Screen";

/**
 * LAYOUT PRINCIPAL DE APLICACION (app/_layout.js)
 * Funcionalidades clave:
 *    1. Provee el store de Redux a toda la aplicacion.
 *    2. Implementa "AuthGuard" para proteccion de rutas.
 *    3. Maneja estado de carga inicial.
 *    4. Renderiza las rutas mediante <Slot> de expo-router
 */
export default function RootLayout() {
  // Estado para controlar la carga inicial de la aplicacion
  const [isReady, setIsReady] = useState(false);
  // Simulacion de tiempo de carga inicial
  useEffect(() => {
    setTimeout(() => setIsReady(true), 500);
  }, []);

  // Muestra indicador de carga mientras la aplicacion no esta lista
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // Estructura de navegacion
  return (
    <Provider store={store}>
      <AuthGuard>
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          <Slot />
        </View>
      </AuthGuard>
    </Provider>
  );
}
