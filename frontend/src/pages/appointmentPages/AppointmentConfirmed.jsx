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
  // Obtener los objetos con los datos de la cita
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

  // Si `selectedDate` es un objeto de tipo `Date`, formatearlo adecuadamente
  let formatedSelectedDate = '';
  if (selectedDate instanceof Date) {
    formatedSelectedDate = selectedDate.toISOString().split('T')[0];
  } else if (typeof selectedDate === 'string' && selectedDate.includes('T')) {
    formatedSelectedDate = selectedDate.split('T')[0];
  } else {
    formatedSelectedDate = selectedDate || 'No disponible';
  }

  // Si `selectedTime` es un objeto de tipo `Date`, formatearlo adecuadamente
  let formatedSelectedTime = '';
  if (selectedTime instanceof Date) {
    formatedSelectedTime = selectedTime.toTimeString().split(' ')[0];
  } else if (typeof selectedTime === 'string' && selectedTime.length === 5) {
    formatedSelectedTime = selectedTime + ':00';
  } else {
    formatedSelectedTime = selectedTime || 'No disponible';
  }

  const navigate = useNavigate();
  const { clearAll } = useAppointmentStore();

  const handleClick = () => {
    localStorage.removeItem('appointment-storage');
    clearAll(); // Asegúrate de definir `clearAll()` en el store o donde lo necesites
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
          <strong>Fecha:</strong> {formatedSelectedDate}
          <strong> Hora: </strong> {formatedSelectedTime} hrs
        </h3>
      </section>
      <section>
        <Card className="my-12 w-1/5 mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Resumen del servicio</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <p>Servicio</p>
              <CardDescription>Polarizado</CardDescription>
            </div>
            <div>
              <p>Vehículo</p>
              <CardDescription>
                {selectedVehicle?.marca} {selectedVehicle?.modelo}
              </CardDescription>
            </div>
            <div>
              <p>Tipo</p>
              <CardDescription>
                {selectedPolarizeType?.tipo} {selectedOpacity?.value}% de
                opacidad
              </CardDescription>
            </div>
            <div className="border-b-2 pb-4">
              <p>Zona</p>
              <CardDescription>{selectedCoverage?.nombre}</CardDescription>
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
