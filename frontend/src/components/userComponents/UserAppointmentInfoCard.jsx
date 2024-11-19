import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

export function AppointmentCard({
  citaId,
  state,
  fecha,
  hora,
  totalCost,
  totalTime,
  type,
  opacity,
  coverage,
  onCancel,
}) {
  const stateClass = `font-semibold ${
    state === 'Activa' ? 'text-green-500' : 'text-red-500'
  }`;

  const cardClass = `${state === 'Cancelada' ? 'bg-gray-200' : ''}`;

  // Manejar el clic en el botón "Cancelar"
  const handleButtonClick = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      onCancel(); // Llamar a la función onCancel que ya tiene el citaId adecuado
    }
  };

  return (
    <Card className={`w-[90%] mx-auto p-6 ${cardClass}`}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Servicio</CardTitle>
          <span className={stateClass}>{state}</span>
        </div>
      </CardHeader>
      <CardContent>
        <section className="flex gap-20">
          <div>
            <p className="font-semibold text-2xl">Fecha</p>
            <p className="text-2xl">{fecha}</p>
          </div>
          <div>
            <p className="font-semibold text-2xl">Hora</p>
            <p className="text-2xl">{hora}</p>
          </div>
        </section>
        <section className="flex justify-center gap-12 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Costo total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-2xl">$ {totalCost}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Duración</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-2xl">{totalTime} horas</p>
            </CardContent>
          </Card>
        </section>
        <section className="flex justify-center mt-16 mb-8 text-center gap-16">
          <div>
            <b className="text-2xl">Tipo de papel</b>
            <p className="text-2xl">{type}</p>
          </div>
          <div>
            <b className="text-2xl">Opacidad</b>
            <p className="text-2xl">{opacity}%</p>
          </div>
          <div>
            <b className="text-2xl">Zona polarizado</b>
            <p className="text-2xl">{coverage}</p>
          </div>
        </section>
        <section className="flex justify-center gap-20 mt-8">
          {state === 'Cancelada' ? (
            ''
          ) : (
            <Button onClick={handleButtonClick} className="bg-red-600 w-1/6">
              Cancelar
            </Button>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
