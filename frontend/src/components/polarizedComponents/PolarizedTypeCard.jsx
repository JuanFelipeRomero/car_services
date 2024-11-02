import { PolarizedProductCard } from '@/components/PolarizedProductCard';
import { Button } from '../ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function PolarizedTypeCard({
  description,
  image,
  title,
  type,
  price,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const cardClassName = `${isSelected ? 'bg-blue-200' : ''}`;

  return (
    <main className="md:w-1/6">
      <h3 className=" text-center font-semibold md:text-3xl">{type}</h3>
      <p className="text-center my-6">{description}</p>
      <Card className={cardClassName}>
        <img
          src={image}
          alt="Foto del rollo de papel polarizado"
          className="border-b border-b-black-500 w-full"
        />
        <CardContent>
          <p className="mt-4">{title}</p>
          <p>{type}</p>
          <p className="mt-2 font-bold">${price} x metro</p>
        </CardContent>
        <Button onClick={handleClick} className="bg-blue-600 m-auto block mb-6">
          Seleccionar
        </Button>
      </Card>
    </main>
  );
}
