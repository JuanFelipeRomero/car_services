import { create } from 'zustand';

//Definir store para autenticacion
const useAuthStore = create((set) => ({
  user: null, // El estado inicial del usuario (puede ser un objeto o null)
  token: null, // El estado inicial del token (podemos usarlo para saber si hay sesión activa)
  isAuthenticated: false, // Estado para saber si el usuario está autenticado

  //Accion para manejar inicio de sesion
  login: (userData, token) =>
    set({
      user: userData,
      token: token,
      isAuthenticated: true,
    }),

  //Accion para manejar cierre de sesion
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  loadFromLocalStorage: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      set({
        user: user,
        token: token,
        isAuthenticated: true,
      });
    }
  },
}));

export default useAuthStore;
