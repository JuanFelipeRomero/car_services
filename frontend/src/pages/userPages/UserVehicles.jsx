import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { UserVehicleCard } from '@/components/userComponents/UserVehicleCardInfo';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/stores/useAuthStore';
import { useState } from 'react';
import { Charge } from '@/components/Charge';
import { useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserVehicles() {
  const token = useAuthStore((state) => state.token);

  const vehiclesInfo = [
    {
      Marca: 'Renault',
      Modelo: 'Megan',
      Tipo: 'Automovil',
      Placa: 'ABC123',
    },
    {
      Marca: 'Chevrolet',
      Modelo: 'Optra',
      Tipo: 'Automovil',
      Placa: 'DEF321',
    },
  ];

  const [vehiclesData, setVehiclesData] = useState(null);
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
        setVehiclesData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Charge />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <h1 className="text-center text-4xl font-semibold my-12">
          Vehiculos registrados
        </h1>
        <Button className="block w-1/6 mx-auto my-12 bg-blue-600">
          Nuevo vehiculo
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
              />
            );
          })}
        </section>
      </main>
    </SidebarProvider>
  );
}
