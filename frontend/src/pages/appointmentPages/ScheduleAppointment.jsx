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
import useAppointmentStore from '@/stores/useAppointmentStore';
import useAuthStore from '@/stores/useAuthStore';

const apiUrl = import.meta.env.VITE_API_URL;

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
  const token = useAuthStore((state) => state.token);
  const { setDate, setTime } = useAppointmentStore();

  //Obtener los objetos con los datos de la cita
  const selectedVehicle = useAppointmentStore((state) => state.selectedVehicle);
  const selectedPolarizeType = useAppointmentStore(
    (state) => state.selectedPolarizeType
  );
  const selectedOpacity = useAppointmentStore((state) => state.selectedOpacity);
  const selectedCoverage = useAppointmentStore(
    (state) => state.selectedCoverage
  );

  const totalCost = useAppointmentStore((state) => state.totalCost);
  const totalTime = useAppointmentStore((state) => state.totalTime);

  //manejo del sibmit
  const onSubmit = async (data) => {
    //Tomar los datos necesarios para hacer la solicitud
    const appointmentData = {
      zona_id: selectedCoverage.id,
      papelpolarizado_id: selectedPolarizeType.id,
      opacidad: selectedOpacity.value,
      duracion: totalTime,
      costoaproximado: totalCost,
      fecha: data.fecha,
      hora: data.hora,
      estado: 'Activa',
      vehiculo_placa: selectedVehicle.placa,
    };

    setDate(appointmentData['fecha']);
    setTime(appointmentData['hora']);

    console.log('Datos enviados: ' + JSON.stringify(appointmentData));

    try {
      const response = await fetch(
        `${apiUrl}/guardar-polariado-servicio-cita`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.ok) {
        console.log('Registro exitoso');
        // Navegar nuevamente al home u otro lugar que tenga sentido después del registro
        navigate('/confirmed');
      } else {
        console.error('Error en el agendamiento:', response.statusText);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
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
