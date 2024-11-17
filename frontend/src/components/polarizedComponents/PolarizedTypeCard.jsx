import { Button } from '../ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function PolarizedTypeCard({
  image,
  description,
  type,
  price,
  select = true,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const cardClassName = `${isSelected ? 'bg-blue-200' : ''}`;

  return (
    <main className="md:w-1/5">
      <Card className={cardClassName}>
        <img
          src={image}
          alt="Foto del rollo de papel polarizado"
          className="border-b border-b-black-500 w-full"
        />
        <CardContent>
          <p className="mt-4 font-bold text-2xl">Papel {type}</p>
          <p className="my-6">{description}</p>
          <p className="mt-2 font-bold">${price} x metro</p>
        </CardContent>
        {select ? (
          <Button
            onClick={handleClick}
            className="bg-blue-600 m-auto block mb-6"
          >
            Seleccionar
          </Button>
        ) : (
          ''
        )}
      </Card>
    </main>
  );
}
