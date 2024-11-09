import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CostCard from '../cost and time components/CostCard';
import TimeCard from '../cost and time components/TimeCard';

export default function PastAppointmentCard({ service }) {
  return (
    <Card className="w-[90%] mx-auto p-6 bg-gray-200">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Service</CardTitle>
          <span>Finalizada</span>
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
      </CardContent>
    </Card>
  );
}
