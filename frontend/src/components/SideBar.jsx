import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

// Menu items.
const items = [
  {
    title: 'Información personal',
    url: '/user/profile',
  },
  {
    title: 'Vehiculos',
    url: '/user/cars',
  },
  {
    title: 'Citas agendadas',
    url: '/user/appointments',
  },
  {
    title: 'Citas Pasadas',
    url: '/user/pastappointments',
  },
  {
    title: 'Log out',
    url: '#',
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <button
            className="mt-8 text-left pl-8"
            onClick={() => (window.location.href = '/')}
          >
            Volver
          </button>
          <SidebarGroupLabel className="text-3xl mb-4 mt-8 pl-6 text-black">
            Usuario
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={'mt-4 ml-4 font-semibold '}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
