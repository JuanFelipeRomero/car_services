import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { UserVehicleCard } from '@/components/userComponents/UserVehicleCardInfo';
import { Button } from '@/components/ui/button';

export default function UserVehicles() {
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
          {vehiclesInfo.map((vehicle) => (
            <UserVehicleCard vehicleInfo={vehicle} />
          ))}
        </section>
      </main>
    </SidebarProvider>
  );
}
