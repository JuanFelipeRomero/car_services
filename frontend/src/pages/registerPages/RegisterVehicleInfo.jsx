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
import { Input } from '@/components/ui/input';

// Definimos el esquema con zod
const formSchema = z.object({
  marca: z.string().min(2, {}),
  email: z.string().email({
    message: 'Introduce un email válido.',
  }),
  nombreUsuario: z.string().min(2, {
    message: 'El nombre de usuario debe tener al menos 2 caracteres.',
  }),
  contrasena: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres.',
  }),
});

export function VehicleInfoForm() {
  // Utiliza el hook useForm y pasa el resolver de zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Marca: '',
      Modelo: '',
      Tipo: '',
      placa: '',
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = (values) => {
    console.log('Datos enviados:', values);
  };

  return (
    <main className="pt-8">
      <a href="/registerpersonalinfo" className="text-black font-medium pl-20">
        Atras
      </a>
      <h1 className="text-center font-medium md:text-[40px] mt-32">
        Información del vehiculo
      </h1>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Tipo vehiculo */}
          <FormField
            control={form.control}
            name="Tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded-md">
                    <option value="user">Sedan</option>
                    <option value="user">Hatchback</option>
                    <option value="admin">SUV</option>
                    <option value="moderator">Pickup</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo PLACA*/}
          <FormField
            control={form.control}
            name="contrasena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Placa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirmar */}
          <Button type="submit" className="w-full">
            <a href="/">Confirmar</a>
          </Button>
        </form>
      </Form>
    </main>
  );
}
