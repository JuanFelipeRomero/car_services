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

const loginSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(6),
});

export function LoginPage() {
  const form = useForm({
    resolve: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log(`Datos enviados: `, values);
    navigate('/');
  };

  return (
    <>
      <main className="h-screen w-full login-bg pt-8">
        <ReturnBtn color="white" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/4 m-auto mt-40 border px-12 py-8 boder rounded-md bg-white"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nombre de usuario"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <a href="/">Ingresar</a>
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
