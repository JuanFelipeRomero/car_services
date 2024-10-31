import { SelectVehicleCard } from '@/components/SelectVehicleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function SelectVehicle() {
  return (
    <>
      <main className="pt-8">
        <Link to="/polarizedinfo" className="text-black font-medium pl-20">
          Atras
        </Link>
        <h1 className=" font-bold md:text-4xl pl-32 mt-12">
          Polarizado de Alta Calidad
        </h1>
        <section className="flex flex-col items-center pt-12">
          <h2 className="font-semibold mb-8">Seleccione un vehiculo</h2>
          <div className="w-full flex justify-center gap-8">
            <SelectVehicleCard
              marca={'Renault'}
              modelo={'Clio'}
              tipo={'Sedan'}
              placa={'CXV358'}
            />
            <SelectVehicleCard
              marca={'Renault'}
              modelo={'Clio'}
              tipo={'Sedan'}
              placa={'CXV358'}
            />
          </div>

          <Button className="w-1/5 mt-10">Siguiente</Button>
        </section>
      </main>
    </>
  );
}
