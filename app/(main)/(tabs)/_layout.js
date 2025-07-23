/*--------------------------- MODULOS ---------------------------*/
import { useRouter } from "expo-router";
import { useRef } from "react";
/*---------------------------- REDUX ----------------------------*/

/*------------------------- COMPONENTES -------------------------*/
import { Tabs } from "expo-router";
import { Pressable } from "react-native";

import {
  HomeIcon,
  ProfileIcon,
  MessageIcon,
  SearchIcon,
  Send
} from "../../../components/Icons";

/**
 * LAYOUT DE NAVEGACION POR TABS (app/(main)/(tabs)/_layout.js)
 * Funcionalidades clave:
 *    1. Implementacion de navegacion inferior con 3 pestanas(home/explore/profile)
 *    2. Configuracion de apariencia global de la barra de tabs.
 *    3. Proporciona acceso rapido entre secciones clave de la app.
 *
 *    Estructura:
 *        - Home: Pantalla principal, tiene boton con direccion a "/messages".
 *        - Explore: Pantalla de busqueda/descubrimiento.
 *        - Profile: Pantalla de perfil de usuario loggeado.
 */
export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "black" },
        tabBarStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      {/*------------------------- Pestana "home" ------------------------*/}
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Red Social",
          headerShown: true,
          title: "Inicio",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          headerRight: () => (
            <Pressable onPress={() => router.push("/(main)/messages")} style={{ marginRight: 15 }}>
              <Send color="white" />
            </Pressable>
          ),
        }}
      />
      {/*------------------------ Pestana "explore" ----------------------*/}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorar",
          headerShown: true,
          headerTitle: "Explorar",
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      {/*------------------------ Pestana "profile" ----------------------*/}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          headerTitle: "Perfil",
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
