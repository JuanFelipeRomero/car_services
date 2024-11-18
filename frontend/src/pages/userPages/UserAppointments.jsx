import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { AppointmentCard } from '@/components/userComponents/UserAppointmentInfoCard';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserAppointment() {
  const token = useAuthStore((state) => state.token);

  // Inicializar `appointmentsData` como un arreglo vacío
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/citas/mis-citas-activas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        // Asegurarse de que `result` sea un arreglo antes de usarlo
        if (Array.isArray(result)) {
          setAppointmentsData(result);
        } else {
          // Si `result` no es un arreglo, se asigna un arreglo vacío
          setAppointmentsData([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Función para cancelar una cita
  const handleCancel = async (citaId) => {
    try {
      const response = await fetch(`${apiUrl}/citas/cancelar/${citaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Cita cancelada exitosamente');

        // Actualizar el estado de `appointmentsData` para eliminar la cita cancelada
        setAppointmentsData((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== citaId)
        );
      } else {
        const result = await response.json();
        alert(`Error al cancelar la cita: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor.');
    }
  };

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
            Citas Agendadas
          </h1>
          <div className="flex flex-col gap-12">
            {appointmentsData.map((appointment) => {
              const {
                id, // Ahora obtenemos el `id` de la cita
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
                  key={id} // Usar el `id` como clave única
                  citaId={id} // Pasar `citaId` al componente hijo
                  state={estado}
                  fecha={formattedFecha}
                  hora={hora}
                  totalCost={costo_total}
                  totalTime={duracion}
                  type={tipo_polarizado}
                  opacity={opacidad}
                  coverage={zona_polarizado}
                  onCancel={() => handleCancel(id)} // Pasar `handleCancel` como prop con el ID específico
                />
              );
            })}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}
