import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/SideBar';

export function UserCanceledAppointments() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <section className="">
          <h1 className="text-center text-4xl font-semibold my-12">
            Citas canceladas
          </h1>
        </section>
      </main>
    </SidebarProvider>
  );
}
