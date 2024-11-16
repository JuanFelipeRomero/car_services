import { useEffect } from 'react';
import useAuthStore from './stores/useAuthStore'; // Importa la store

// Componente de orden superior que asegura cargar la autenticación desde localStorage
const WithAuth = ({ children }) => {
  const loadFromLocalStorage = useAuthStore(
    (state) => state.loadFromLocalStorage
  );

  useEffect(() => {
    // Cargar el estado de autenticación desde localStorage
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return children;
};

export default WithAuth;
