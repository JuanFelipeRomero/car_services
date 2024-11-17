import { SelectVehicleCard } from '@/components/SelectVehicleCard';
import { Button } from '@/components/ui/button';
import ReturnBtn from '@/components/ReturnBtn';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import useAppointmentStore from '@/stores/useAppointmentStore';

const apiUrl = import.meta.env.VITE_API_URL;

export function SelectVehicle() {
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Estado para la seleccion de la card
  const { setSelectedVehicle } = useAppointmentStore();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Asegurarse de activar el estado de carga
      try {
        const response = await fetch(`${apiUrl}/uservehicles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          // Comprobar si el fetch fue exitoso
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message); // Guardar el mensaje del error
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchData();
  }, [token]);

  const handleCardClick = (vehicle) => {
    setSelected(vehicle); //almacenar info del vehiculo seleccionado
  };

  const handleClick = () => {
    if (!selected) {
      alert('Debe seleccionar un vehiculo');
      return;
    }
    setSelectedVehicle(selected);
    navigate('/selectpolarizedfeatures');
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center">
        <span className="block mx-auto text-2xl font-semibold">
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <>
      <main>
        <ReturnBtn />
        <h1 className="font-bold md:text-4xl pl-32 mt-12">
          Polarizado de Alta Calidad
        </h1>
        <section className="flex flex-col items-center pt-12">
          <h2 className="font-semibold mb-8">Seleccione un vehiculo</h2>
          <div className="w-full flex justify-center gap-8">
            {data.map((vehicle) => {
              const { marca, modelo, tipo, placa } = vehicle; // Validar propiedades
              return (
                <SelectVehicleCard
                  key={placa}
                  marca={marca}
                  modelo={modelo}
                  tipo={tipo}
                  placa={placa}
                  onClick={() => handleCardClick(vehicle)}
                />
              );
            })}
          </div>
          <Button onClick={handleClick} className="w-1/5 mt-10">
            Siguiente
          </Button>
        </section>
      </main>
    </>
  );
}
