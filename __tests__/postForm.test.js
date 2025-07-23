import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PostForm from "../components/forms/PostForm";

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: "Images" },
}));

/**
 * Mock (versión falsa) de la función createPost del servicio de publicaciones
 */
jest.mock("../services/post.service.js", () => ({
  createPost: jest.fn(() => Promise.resolve(true)),
}));

// En tu archivo de pruebas (postForm.test.js o jest.setup.js)
jest.mock("../components/Icons.jsx", () => ({
  AddPhoto: () => "MockedAddPhoto", // Componente mockeado simple
  Clear: () => "MockedClear", // Componente mockeado simple
  // Agrega aquí todos los íconos que uses en tus tests
}));

it("renderiza correctamente los elementos principales", () => {
  const { getByPlaceholderText, getByText } = render(
    <PostForm onPostCreated={() => {}} />
  );

  expect(
    getByPlaceholderText("Escribe el contenido de tu publicación")
  ).toBeTruthy();
  expect(getByText("Crear publicación")).toBeTruthy();
});
