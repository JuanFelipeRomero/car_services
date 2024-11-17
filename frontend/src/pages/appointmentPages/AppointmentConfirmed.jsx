import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import ReturnBtn from '@/components/ReturnBtn';
import useAppointmentStore from '@/stores/useAppointmentStore';

export default function AppointmentConfirmed() {
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
  let selectedDate = useAppointmentStore((state) => state.selectedDate);
  let selectedTime = useAppointmentStore((state) => state.selectedTime);

  // Ajustar la fecha para extraer solo la parte `YYYY-MM-DD`
  if (selectedDate && selectedDate.includes('T')) {
    var formatedSelectedDate = selectedDate.split('T')[0];
  }

  // Asegurar que la hora tenga el formato `HH:MM:SS`
  if (selectedTime && selectedTime.length === 5) {
    var formatedSelectedTime = (selectedTime += ':00');
  }

  const navigate = useNavigate();
  const { clearAll } = useAppointmentStore();

  const handleClick = () => {
    localStorage.removeItem('appointment-storage');
    clearAll();
    navigate('/polarizedinfo');
  };

  return (
    <main>
      <ReturnBtn />
      <section className="text-center">
        <h1 className="text-center font-bold md:text-5xl mt-20 mb-8 text-green-600">
          Cita agendada
        </h1>
        <h3 className="text-lg t-0">
          <strong>fecha:</strong> {formatedSelectedDate}
          <strong> hora: </strong> {formatedSelectedTime} hrs
        </h3>
      </section>
      <section>
        <Card className="my-12 w-1/5 mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Resumen del servico</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p>Servicio</p>
              <CardDescription>Polarizado</CardDescription>
            </div>
            <div>
              <p>Vehiculo</p>
              <CardDescription>
                {selectedVehicle.marca} {selectedVehicle.modelo}
              </CardDescription>
            </div>
            <div>
              <p>Tipo</p>
              <CardDescription>
                {selectedPolarizeType.tipo} {selectedOpacity.value}% de opacidad
              </CardDescription>
            </div>
            <div className="border-b-2 pb-4">
              <p>Zona</p>
              <CardDescription>{selectedCoverage.nombre}</CardDescription>
            </div>
            <div>
              <p>Costo aproximado</p>
              <CardDescription>$ {totalCost}</CardDescription>
            </div>
            <div>
              <p>Tiempo aproximado</p>
              <CardDescription>{totalTime} horas</CardDescription>
            </div>
          </CardContent>
        </Card>
        <Button onClick={handleClick} className="w-1/6 block mx-auto">
          Volver
        </Button>
      </section>
    </main>
  );
}
