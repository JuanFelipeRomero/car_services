import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import { AppointmentCard } from '@/components/userComponents/UserAppointmentInfoCard';

export default function UserProfile() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Citas agendadas
          </h1>
          <AppointmentCard></AppointmentCard>
        </section>
      </main>
    </SidebarProvider>
  );
}
