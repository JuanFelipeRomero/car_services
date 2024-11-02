import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
export default function PolarizedOpacityCard({ opacity, description }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const cardClassName = `${isSelected ? 'bg-blue-200' : ''}`;

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle>{opacity}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <Button onClick={handleClick} className="bg-blue-600 m-auto block mb-6">
        Seleccionar
      </Button>
    </Card>
  );
}
