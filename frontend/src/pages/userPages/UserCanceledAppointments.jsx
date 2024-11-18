import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { AppointmentCard } from '@/components/userComponents/UserAppointmentInfoCard';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { Charge } from '@/components/Charge';

const apiUrl = import.meta.env.VITE_API_URL;

export function UserCanceledAppointments() {
  const token = useAuthStore((state) => state.token);

  const [cancelledAppointmentsData, setCancelledAppointmentsData] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/citas/mis-citas-canceladas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        // Asegurarse de que `result` sea un arreglo antes de usarlo
        if (Array.isArray(result)) {
          setCancelledAppointmentsData(result);
        } else {
          // Si `result` no es un arreglo, se asigna un arreglo vacío
          setCancelledAppointmentsData([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Validar si `cancelledAppointmentsData` es null o está vacío
  if (loading) {
    return <Charge />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!cancelledAppointmentsData || cancelledAppointmentsData.length === 0) {
    return <div>No tienes citas canceladas.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Citas Canceladas
          </h1>
          <div className="flex flex-col gap-12">
            {cancelledAppointmentsData.map((appointment) => {
              const {
                id,
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
                  key={id}
                  citaId={id}
                  state={estado}
                  fecha={formattedFecha}
                  hora={hora}
                  totalCost={costo_total}
                  totalTime={duracion}
                  type={tipo_polarizado}
                  opacity={opacidad}
                  coverage={zona_polarizado}
                  onCancel={null} // Las citas canceladas no necesitan un botón de cancelar
                />
              );
            })}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}
