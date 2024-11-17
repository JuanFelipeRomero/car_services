import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function PolarizedCoverageCard({
  title,
  description,
  select = true,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const cardClassName = `text-center w-1/6 ${isSelected ? 'bg-blue-200' : ''}`;

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
        {select ? (
          <Button
            onClick={handleClick}
            className="bg-blue-600 m-auto block my-6"
          >
            Seleccionar
          </Button>
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  );
}
