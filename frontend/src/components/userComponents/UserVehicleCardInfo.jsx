import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';

export function UserVehicleCard({ marca, modelo, tipo, placa, onDelete }) {
  return (
    <Card className="w-1/5 py-6 px-6">
      <CardContent className="flex flex-col gap-6 py-6">
        <div>
          <b>Marca</b>
          <p>{marca}</p>
        </div>
        <div>
          <b>Modelo</b>
          <p>{modelo}</p>
        </div>
        <div>
          <b>Tipo</b>
          <p>{tipo}</p>
        </div>
        <div>
          <b>Placa</b>
          <p>{placa}</p>
        </div>
      </CardContent>
      <Button
        onClick={onDelete} // Añadir la funcionalidad de eliminación
        className="bg-red-500 w-1/2 mx-auto block"
      >
        Eliminar
      </Button>
    </Card>
  );
}
