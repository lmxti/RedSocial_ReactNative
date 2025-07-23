// <-------------------------- MODULOS -------------------------->
import { router } from "expo-router";
// <------------------------ COMPONENTES ------------------------>
import { Alert } from "react-native";

// <------------------------- SERVICIOS ------------------------->

const CustomAlert = ({ title, message, buttonText = "Ok", redirectRoute }) => {
  Alert.alert(title, message, [
    {
      text: buttonText,
      onPress: () => {
        if (redirectRoute) {
          router.replace(redirectRoute);
        }
      },
    },
  ]);
};

export default CustomAlert;
