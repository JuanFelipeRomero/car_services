import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { UserVehicleCard } from '@/components/userComponents/UserVehicleCardInfo';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { useState, useEffect } from 'react';
import { Charge } from '@/components/Charge';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserVehicles() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [vehiclesData, setVehiclesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/uservehicles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        // Verificar si el resultado es un arreglo
        if (Array.isArray(result)) {
          setVehiclesData(result);
        } else {
          setVehiclesData([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Función para manejar la eliminación del vehículo
  const handleDeleteVehicle = async (placa) => {
    try {
      const response = await fetch(`${apiUrl}/vehiculos/eliminar/${placa}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Vehículo eliminado exitosamente');
        // Filtrar el vehículo eliminado de la lista local sin tener que volver a hacer una solicitud completa
        setVehiclesData(
          vehiclesData.filter((vehicle) => vehicle.placa !== placa)
        );
      } else {
        const result = await response.json();
        alert(`Error al eliminar el vehículo: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  const handleNewVehicle = () => {
    navigate('/registrar-nuevo-vehiculo');
  };

  if (loading) {
    return <Charge />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <h1 className="text-center text-4xl font-semibold my-12">
          Vehículos registrados
        </h1>
        <Button
          onClick={handleNewVehicle}
          className="block w-1/6 mx-auto my-12 bg-blue-600"
        >
          Nuevo vehículo
        </Button>
        <section className="flex justify-center gap-12">
          {vehiclesData.map((vehicle) => {
            const { marca, modelo, tipo, placa } = vehicle;
            return (
              <UserVehicleCard
                key={placa}
                marca={marca}
                modelo={modelo}
                tipo={tipo}
                placa={placa}
                onDelete={() => handleDeleteVehicle(placa)} // Pasar la función onDelete
              />
            );
          })}
        </section>
      </main>
    </SidebarProvider>
  );
}
