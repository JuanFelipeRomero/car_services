import { Card, CardContent } from '@/components/ui/card';

export function UserInfoSection({ name, value }) {
  return (
    <>
      <p className="font-semibold mt-6">{name}</p>
      <p>{value}</p>
    </>
  );
}

export default function UserInfoCard({ name, email, phone }) {
  return (
    <Card className="w-1/4 mx-auto py-6 px-6">
      <CardContent className="flex flex-col gap-6 pt-6">
        <div>
          <b>Nombre</b>
          <p>{name}</p>
        </div>
        <div>
          <b>Correo</b>
          <p>{email}</p>
        </div>
        <div>
          <b>Telefono</b>
          <p>{phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
