/*--------------------------- MODULOS ---------------------------*/
import { configureStore } from "@reduxjs/toolkit";
/*--------------------------- REDUCER ---------------------------*/
import authReducer from "./authSlice";

/**
 * Configuracion principal del store(estado global) de Redux
 */
const store = configureStore({
  reducer: {
    // Reducer para manejar el estado de autenticacion
    auth: authReducer,
  },
});

// Exportacion de `store` para proveer el estado global.
export default store;