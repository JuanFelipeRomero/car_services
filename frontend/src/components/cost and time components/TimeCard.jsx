import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TimeCard({ time = 0, covert = 'laterales' }) {
  return (
    <Card className="md:w-1/5 p-6">
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
