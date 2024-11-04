import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TimeCard({ time, covert }) {
  return (
    <Card className="w-1/6 p-6">
      <CardHeader className="text-center">
        <CardTitle className="mb-4">Tiempo</CardTitle>
        <CardTitle className="md:text-4xl">{time} horas</CardTitle>
      </CardHeader>
      <CardContent>
        <b>{covert}</b>
        <p>{time} horas</p>
      </CardContent>
    </Card>
  );
}
