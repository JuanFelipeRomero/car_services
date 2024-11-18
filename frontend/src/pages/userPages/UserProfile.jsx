import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import UserInfoCard from '@/components/userComponents/UserInfoCard';
import { useEffect } from 'react';
import { useState } from 'react';
import { Charge } from '@/components/Charge';
import useAuthStore from '@/stores/useAuthStore';

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserProfile() {
  const token = useAuthStore((state) => state.token);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(userData);

  if (loading) {
    return <Charge />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Información personal
          </h1>
          <UserInfoCard
            name={userData.usuario_nombre}
            email={userData.usuario_correo}
            phone={userData.usuario_telefono}
          />
        </section>
      </main>
    </SidebarProvider>
  );
}
