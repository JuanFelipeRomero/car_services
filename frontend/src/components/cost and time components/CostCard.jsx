import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CostCard({
  totalCost = 0,
  type = 'Nanoceramico',
  meterPrice = 20000,
  covert = 'laterales',
  meters = '2',
  polarizePrice,
  workPrice = 40000,
}) {
  polarizePrice = meterPrice * meters;
  totalCost = polarizePrice + workPrice;

  return (
    <Card className="md:w-1/5 p-6">
      <CardHeader className="text-center">
        <CardTitle className="mb-4">Costo</CardTitle>
        <CardTitle className="md:text-4xl">${totalCost}</CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-4">
          <div>
            <b>{type}</b>
            <p>{meterPrice} x metro</p>
          </div>
          <div>
            <b>
              {covert} ({meters} metros)
            </b>
            <p>{polarizePrice}</p>
          </div>
          <div>
            <b>Mano de obra</b>
            <p>${workPrice}</p>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
