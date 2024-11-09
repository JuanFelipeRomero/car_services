import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import UserInfoCard from '@/components/userComponents/UserInfoCard';

export default function UserProfile() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Información personal
          </h1>
          <UserInfoCard />
        </section>
      </main>
    </SidebarProvider>
  );
}
