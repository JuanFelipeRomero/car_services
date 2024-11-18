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
  FormMessage,
} from '@/components/ui/form';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Input } from '@/components/ui/input';
import ReturnBtn from '@/components/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '@/stores/useAuthStore'; // Para obtener el token del usuario autenticado

// Definimos el esquema con zod
const formSchema = z.object({
  marca: z.string().min(2),
  modelo: z.string().min(2, {
    message: 'Mínimo 2 caracteres',
  }),
  tipo: z.string(),
  placa: z.string().max(7).min(6, {
    message: 'La placa debe tener entre 6 y 7 caracteres.',
  }),
});

const apiUrl = import.meta.env.VITE_API_URL;

export function RegisterNewVehicle() {
  const token = useAuthStore((state) => state.token); // Obtener el token desde la store

  const [fetchError, setFetchError] = useState(null);

  // Utiliza el hook useForm y pasa el resolver de zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marca: '',
      modelo: '',
      tipo: 'Sedan',
      placa: '',
    },
  });

  const navigate = useNavigate();

  // Manejar el envío del formulario para registrar el vehículo
  const onSubmit = async (formData) => {
    try {
      // Hacer la solicitud POST al backend
      const response = await fetch(`${apiUrl}/vehiculos/nuevo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Si el registro es exitoso
        const result = await response.json();
        alert(`Vehículo registrado exitosamente: ${result.placa}`);
        // Navegar a otra página o actualizar la lista de vehículos
        navigate('/user/cars'); // Ajusta la ruta a donde quieres redirigir
      } else {
        // Si hay un error, mostrar mensaje de error
        const result = await response.json();
        setFetchError(result.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setFetchError('Error al conectar con el servidor.');
    }
  };

  return (
    <main>
      <ReturnBtn />
      <h1 className="text-center font-medium md:text-[40px] mt-24 mb-6">
        Información del vehículo
      </h1>

      {fetchError ? (
        <Alert variant="destructive" className="w-1/2 mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{fetchError}</AlertDescription>
        </Alert>
      ) : (
        ''
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/4 m-auto mt-10 border px-12 py-8 boder rounded-md"
        >
          {/* Campo Marca */}
          <FormField
            control={form.control}
            name="marca"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Modelo */}
          <FormField
            control={form.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Tipo vehículo */}
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded-md">
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="SUV">SUV</option>
                    <option value="Pickup">Pickup</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo PLACA*/}
          <FormField
            control={form.control}
            name="placa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ABC123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirmar */}
          <Button type="submit" className="w-full">
            Confirmar
          </Button>
        </form>
      </Form>
    </main>
  );
}
