import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';

export function VehicleInfoSection({ name, value }) {
  return (
    <>
      <p className="font-semibold mt-6">{name}</p>
      <p>{value}</p>
    </>
  );
}

export function UserVehicleCard({ vehicleInfo }) {
  return (
    <Card className="w-1/5 py-6 px-6">
      <CardContent>
        {Object.entries(vehicleInfo).map(([name, value]) => {
          return <VehicleInfoSection name={name} value={value} />;
        })}
      </CardContent>
      <Button className="bg-red-500 w-1/2 mx-auto block">Eliminar</Button>
    </Card>
  );
}
