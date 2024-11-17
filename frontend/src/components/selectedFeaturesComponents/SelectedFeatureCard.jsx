import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function SelectedFeatureCard({ title, info }) {
  return (
    <Card>
      <CardHeader>
        <h1 className="font-semibold">{title}</h1>
      </CardHeader>
      <CardContent>
        <p>{info}</p>
      </CardContent>
    </Card>
  );
}
