import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../app/(auth)/login";

/**
 * Mock (version falsa) de las funciones de AsyncStorage
 */
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  // Agrega otros métodos si los usas
}));

/**
 * Mock (versión falsa) de la función login del servicio de autenticación
 * para que no haga peticiones HTTP reales y permita simular respuestas
 */
jest.mock("../services/auth.service.js", () => ({
  login: jest.fn(), //Funcion mockeada
}));

/**<--------------- Prueba de renderizado de Login ----------------->*/
describe("Login Screen - Renderizado básico", () => {
  it("muestra todos los elementos principales", () => {
    // Renderizado del componente
    const { getByText, getByPlaceholderText } = render(<Login />);
    //  Verificacion de renderizado de titulo
    expect(getByText("Iniciar sesion")).toBeTruthy();

    // Verificacion de renderizado de campos de texto
    expect(getByPlaceholderText("Nombre de usuario")).toBeTruthy();
    expect(getByPlaceholderText("Contraseña")).toBeTruthy();

    // Verificacion de renderizado de botones
    expect(getByText("¿No tienes cuenta?")).toBeTruthy();
    expect(getByText("Regístrate")).toBeTruthy();
    expect(getByText("Iniciar sesión")).toBeTruthy();
  });

  /**<-------> Prueba de interaccion con los campos de texto -------> */
  it("permite ingresar texto en los campos", () => {
    // Renderizado del componente
    const { getByPlaceholderText } = render(<Login />);

    // Campos de texto de usuario y contraseña
    const usuarioInput = getByPlaceholderText("Nombre de usuario");
    const passwordInput = getByPlaceholderText("Contraseña");

    // Simulación de escritura en campo de texto de usuario y contraseña
    fireEvent.changeText(usuarioInput, "usuarioPrueba");
    fireEvent.changeText(passwordInput, "contraseña123");

    // Verificación de que el texto ingresado es el correcto e igual al simulado
    expect(usuarioInput.props.value).toBe("usuarioPrueba");
    expect(passwordInput.props.value).toBe("contraseña123");
  });
});
