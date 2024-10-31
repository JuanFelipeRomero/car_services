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

import { Link } from 'react-router-dom';

// Definimos el esquema con zod
const formSchema = z.object({
  nombre: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres.',
  }),
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

export function PersonalInfoForm() {
  // Utiliza el hook useForm y pasa el resolver de zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      nombreUsuario: '',
      contrasena: '',
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = (values) => {
    console.log('Datos enviados:', values);
  };

  return (
    <main className="pt-8">
      <Link to="/polarizedinfo" className="text-black font-medium pl-20">
        Atras
      </Link>
      <h1 className="text-center font-medium md:text-[40px] mt-32">
        Información Personal
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-1/4 m-auto mt-10 border px-12 py-8 boder rounded-md"
        >
          {/* Campo Nombre */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Nombre de Usuario */}
          <FormField
            control={form.control}
            name="nombreUsuario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Contraseña */}
          <FormField
            control={form.control}
            name="contrasena"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botón de Enviar */}
          <Button type="submit" className="w-full">
            <Link to="/registervehicleinfo">Continuar</Link>
          </Button>
        </form>
      </Form>
    </main>
  );
}
