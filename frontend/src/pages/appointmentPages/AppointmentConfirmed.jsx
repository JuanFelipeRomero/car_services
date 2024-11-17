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

export default function AppointmentConfirmed({
  serviceName = 'polarizado',
  hour = 13,
  date = '2024-11-06',
}) {
  const vehicle = 'Renault megan';
  const polarizeType = 'Ceramico';
  const polarizeOpacity = '20%';
  const zone = 'Laterales';

  const price = 120000;
  const time = 2;

  const navigate = useNavigate();

  const handleClick = () => {
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
          <strong>fecha:</strong> {date}
          <strong> hora: </strong> {hour} hrs
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
              <CardDescription>{vehicle}</CardDescription>
            </div>
            <div>
              <p>Tipo</p>
              <CardDescription>
                Polarizado {polarizeType} {polarizeOpacity} de opacidad
              </CardDescription>
            </div>
            <div className="border-b-2 pb-4">
              <p>Zona</p>
              <CardDescription>{zone}</CardDescription>
            </div>
            <div>
              <p>Costo aproximado</p>
              <CardDescription>$ {price}</CardDescription>
            </div>
            <div>
              <p>Tiempo aproximado</p>
              <CardDescription>{time} horas</CardDescription>
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
