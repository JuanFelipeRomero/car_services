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

// Definimos el esquema con zod
const formSchema = z.object({
  marca: z.string().min(2),
  modelo: z.string().min(2, {
    message: 'Minimo 3 caracteres',
  }),
  tipo: z.string(),
  placa: z.string().max().min(6, {
    message: 'La placa debe tener al menos 6 caracteres.',
  }),
});

export function VehicleInfoForm() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [fetchError, setFecthError] = useState(null);

  // Utiliza el hook useForm y pasa el resolver de zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marca: '',
      modelo: '',
      tipo: '',
      placa: '',
    },
  });

  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const onSubmit = async (data) => {
    console.log('Datos enviados:', data);

    //Recuperar informacion personal
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));

    //combinar informacion personal e informacion del vehiculo
    const fullData = {
      nombre: personalInfo.nombre,
      correo: personalInfo.email,
      contrasena: personalInfo.contrasena,
      numeroTelefono: personalInfo.telefono,
      placa: data.placa,
      marca: data.marca,
      modelo: data.modelo,
      tipo: data.tipo,
    };

    console.log(fullData);

    try {
      // Hacer la solicitud POST al servidor con los datos combinados
      const response = await fetch(`${apiUrl}/register/client`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullData),
      });

      // Verificar la respuesta
      if (response.ok) {
        console.log('Registro exitoso');
        // Navegar nuevamente al home u otro lugar que tenga sentido después del registro
        navigate('/');
      } else {
        console.error('Error en el registro:', response.statusText);
        setFecthError(true);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <main>
      <ReturnBtn />
      <h1 className="text-center font-medium md:text-[40px] mt-24 mb-6">
        Información del vehiculo
      </h1>

      {fetchError ? (
        <Alert variant="destructive" className="w-1/2 mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ocurrio un problema con el registro.
          </AlertDescription>
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

          {/* Campo Tipo vehiculo */}
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
