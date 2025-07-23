/*--------------------------- MODULOS ---------------------------*/
import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice de Redux para manejar el estado de autenticacion.
 */
const authSlice = createSlice({
  // Nombre de "slice", porcion del estado global.
  name: "auth",
  // Estado inicial de valores de autenticacion
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  // Funciones que modifican el estado de autenticacion
  reducers: {
    // Actualiza el estado con los datos de usuario al iniciar sesion.
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = state.isAuthenticated = true;
    },
    // Restablece el estado (default) cuando se cierra sesion.
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

//Exportacion de funciones/acciones para poder utilizarlas en componentes
export const { loginSuccess, logoutSuccess } = authSlice.actions;
/* Nota: Para modificar/leer estado se utiliza:
        `useSelector`: para obtener el estado.
        `useDispathc`: para ejecutar acciones.
*/

// Exportacion de reducer para que `store` lo pueda utilizar
export default authSlice.reducer;
