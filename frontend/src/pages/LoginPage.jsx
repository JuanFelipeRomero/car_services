import { Link } from 'react-router-dom';
import '../App.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ReturnBtn from '@/components/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import useAuthStore from '@/stores/useAuthStore';
import { useState } from 'react';

// Definir el esquema de validación con Zod
const loginSchema = z.object({
  correo: z.string().email('Debe ser un correo válido'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function LoginPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [error, setError] = useState(false);

  // Configurar el hook de formulario usando `resolver` correctamente
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      correo: '',
      contrasena: '',
    },
  });

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // Manejar el evento de inicio de sesión
  const handleLogin = async (credentials) => {
    try {
      console.log('Credenciales ingresadas:', credentials); // Verificar los valores que estamos enviando
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user, token } = await response.json();

        // Guardar token y usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Actualizar el estado de autenticación global
        console.log('Sesión iniciada correctamente');
        login(user, token);

        // Redirigir al usuario a la página principal después del login exitoso
        navigate('/');
      } else {
        console.error('Error al iniciar sesión: ', response.statusText);
        setError(true);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setError(true);
    }
  };

  return (
    <>
      <main className="h-screen w-full login-bg pt-8">
        <ReturnBtn color="white" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="space-y-8 w-1/4 m-auto mt-40 border px-12 py-8 boder rounded-md bg-white"
          >
            {error ? (
              <Alert variant="destructive" className=" mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Ocurrio un problema el inicio de sesion.
                </AlertDescription>
              </Alert>
            ) : (
              ''
            )}
            {/* Campo para Correo */}
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Correo Electrónico"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Campo para Contraseña */}
            <FormField
              control={form.control}
              name="contrasena"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Botón de Ingreso */}
            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>
        </Form>

        <Link
          to="/registerwelcome"
          className="text-white text-center block mt-8"
        >
          Registrarse
        </Link>
      </main>
    </>
  );
}
