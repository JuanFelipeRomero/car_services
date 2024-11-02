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
import ReturnBtn from '@/components/ReturnBtn';
import { useNavigate } from 'react-router-dom';

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
  const onSubmit = (values) => {
    console.log('Datos enviados:', values);
    navigate('/');
  };

  return (
    <main className="pt-8">
      <ReturnBtn />
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
