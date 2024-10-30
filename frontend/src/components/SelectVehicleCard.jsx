import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';

export function SelectVehicleCard({ marca, modelo, tipo, placa }) {
  return (
    <Card className="w-1/5 pb-8">
      <CardHeader>
        <CardTitle className="text-center mb-4 border-b-2 pb-4">
          Información del vehiculo
        </CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <div className="mb-4">
          <p className="font-bold">Marca</p>
          <p>{marca}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Modelo</p>
          <p>{modelo}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Tipo</p>
          <p>{tipo}</p>
        </div>
        <div className="mb-2">
          <p className="font-bold">Placa</p>
          <p>{placa}</p>
        </div>
      </CardContent>
      <Button className="bg-blue-600 w-1/3 block m-auto">Seleccionar</Button>
    </Card>
  );
}
