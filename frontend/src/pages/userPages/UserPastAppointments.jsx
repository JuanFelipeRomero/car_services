import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';
import PastAppointmentCard from '@/components/userComponents/UserPastAppointmentCard';

export function UserPastAppointments() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Citas pasadas
          </h1>
          <PastAppointmentCard></PastAppointmentCard>
        </section>
      </main>
    </SidebarProvider>
  );
}
