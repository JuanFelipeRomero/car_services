import { Card, CardContent } from '@/components/ui/card';

export function PolarizedProductCard({ image, title, type, opacity, price }) {
  return (
    <Card>
      <img
        src={image}
        alt="Foto del rollo de papel polarizado"
        className="border-b border-b-black-500"
      />
      <CardContent>
        <p className="mt-4">{title}</p>
        <p>{type}</p>
        <p>{opacity} de opacidad</p>
        <p className="mt-2 font-bold">${price} x metro</p>
      </CardContent>
    </Card>
  );
}
