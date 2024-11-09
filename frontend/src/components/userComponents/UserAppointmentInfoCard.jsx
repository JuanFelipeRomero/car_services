import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CostCard from '../cost and time components/CostCard';
import TimeCard from '../cost and time components/TimeCard';
import { Button } from '../ui/button';

export function AppointmentCard({ service }) {
  return (
    <Card className="w-[90%] mx-auto p-6">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Service</CardTitle>
          <span>state</span>
        </div>
      </CardHeader>
      <CardContent>
        <section className="flex gap-20">
          <div>
            <p className="font-semibold text-2xl">Fecha</p>
            <p className="text-2xl">20 / 11 / 2024</p>
          </div>
          <div>
            <p className="font-semibold text-2xl">Hora</p>
            <p className="text-2xl">13:00</p>
          </div>
        </section>
        <section className="flex justify-center gap-12">
          <CostCard />
          <TimeCard />
        </section>
        <section className="flex justify-center gap-20 mt-8">
          <Button className="w-1/6">Reprogramar</Button>
          <Button className="bg-red-600 w-1/6">Cancelar</Button>
        </section>
      </CardContent>
    </Card>
  );
}
