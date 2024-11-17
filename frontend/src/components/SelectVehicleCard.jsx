import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

export function SelectVehicleCard({
  marca,
  modelo,
  tipo,
  placa,
  select = true,
  onClick,
}) {
  const [isSelected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(!isSelected);
    onClick();
  };

  const cardClassname = `w-1/5 + ${isSelected ? 'bg-blue-100' : 'bg-white'}`;

  return (
    <Card className={cardClassname}>
      <CardHeader>
        <CardTitle className="text-center mb-4 border-b-2 pb-4">
          Información del vehiculo
        </CardTitle>
      </CardHeader>
      <CardContent className={'px-10'}>
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
      {select ? (
        <Button
          onClick={handleSelect}
          className="bg-blue-600 m-auto block mb-6"
        >
          Seleccionar
        </Button>
      ) : (
        ''
      )}
    </Card>
  );
}
