import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { AppointmentCard } from '@/components/userComponents/UserAppointmentInfoCard';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserAppointment() {
  const token = useAuthStore((state) => state.token);

  const [appointmentsData, setAppointmentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/citas/mis-citas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setAppointmentsData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Depurar los datos de las citas obtenidas del backend
  console.log(appointmentsData);

  // Validar si `appointmentsData` es null o está vacío
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!appointmentsData || appointmentsData.length === 0) {
    return <div>No tienes citas programadas.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Citas agendadas
          </h1>
          <div className="flex flex-col gap-12">
            {appointmentsData.map((appointment) => {
              const {
                costo_total,
                duracion,
                estado,
                fecha,
                hora,
                opacidad,
                tipo_polarizado,
                zona_polarizado,
              } = appointment;

              // Formatear la fecha para obtener solo la parte antes de la 'T'
              const formattedFecha =
                fecha && fecha.includes('T') ? fecha.split('T')[0] : fecha;

              return (
                <AppointmentCard
                  key={`${fecha}-${hora}`} // Usar una combinación única como clave
                  state={estado}
                  fecha={formattedFecha}
                  hora={hora}
                  totalCost={costo_total}
                  totalTime={duracion}
                  type={tipo_polarizado}
                  opacity={opacidad}
                  coverage={zona_polarizado}
                />
              );
            })}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}
