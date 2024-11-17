import ReturnBtn from '@/components/ReturnBtn';
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
import { useNavigate } from 'react-router-dom';

const appointmentSchema = z.object({
  fecha: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Debe ser una fecha válida en formato YYYY-MM-DD',
    })
    .transform((val) => new Date(val)),
  hora: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: 'Debe ser una hora válida en formato HH:mm',
  }),
});

export default function ScheduleAppointment() {
  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fecha: '',
      hora: '',
    },
  });

  const navigate = useNavigate();

  //Obtener la informacion de las caracteristicas seleccionadas hasta el momento
  const appointmentFeatures = localStorage.getItem('appointment-storage');
  const parsedFeatures = JSON.parse(appointmentFeatures);

  const totalCost = parsedFeatures.state.totalCost;
  const totalTime = parsedFeatures.state.totalTime;

  const onSubmit = (data) => {
    console.log('Datos enviados: ' + data);
    navigate('/confirmed');
  };

  return (
    <main>
      <ReturnBtn />
      <h1 className="text-center font-bold md:text-4xl my-16">Agendar cita</h1>
      <section className="flex justify-center gap-20">
        <div className="text-center">
          <strong className="text-2xl">Costo</strong>
          <p className="text-2xl">${totalCost}</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl">Tiempo</strong>
          <p className="text-2xl">{totalTime} horas</p>
        </div>
      </section>
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-1/4 m-auto mt-10 border px-12 py-8 boder rounded-md"
          >
            {/*Campo de fecha*/}
            <FormField
              control={form.control}
              name="fecha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="fecha" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/*Campo hora*/}
            <FormField
              control={form.control}
              name="hora"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="fecha"
                      min="08:00"
                      max="18:00"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-1/2 block mx-auto">Agendar</Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
