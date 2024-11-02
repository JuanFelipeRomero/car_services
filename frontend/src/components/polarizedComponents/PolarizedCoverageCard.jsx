import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function PolarizedCoverageCard({ coverage, icon, description }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const cardClassName = `text-center w-1/6 ${isSelected ? 'bg-blue-200' : ''}`;

  return (
    <Card className={cardClassName}>
      <CardHeader>
        <CardTitle>{coverage}</CardTitle>
      </CardHeader>
      <CardContent>
        {icon}
        <p className="mt-6">{description}</p>
        <Button onClick={handleClick} className="bg-blue-600 m-auto block my-4">
          Seleccionar
        </Button>
      </CardContent>
    </Card>
  );
}
