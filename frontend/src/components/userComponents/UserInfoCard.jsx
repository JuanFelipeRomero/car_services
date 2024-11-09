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
  const userInfo = {
    Nombre: 'Juan',
    Email: 'juan@ejemplo.com',
    Telefono: '321234567',
    Contraseña: '******',
  };

  return (
    <Card className="w-1/4 mx-auto py-6 px-6">
      <CardContent>
        {Object.entries(userInfo).map(([name, value]) => {
          return <UserInfoSection name={name} value={value} />;
        })}
      </CardContent>
    </Card>
  );
}
