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
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

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
];

export function AppSidebar() {
  const navigate = useNavigate();
  const logOut = useAuthStore((state) => state.logout);

  const handleLogOut = () => {
    // Eliminar token y usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    logOut();
    navigate('/');
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <button className="mt-8 text-left pl-8" onClick={handleClick}>
            Volver
          </button>
          <SidebarGroupLabel className="text-3xl mb-4 mt-8 pl-6 text-black">
            Usuario
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  className={'mt-4 ml-4 font-semibold'}
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <button
                onClick={handleLogOut}
                className="text-left pl-2 py-2 mt-4 ml-4 font-semibold rounded-md text-red-600 hover:bg-red-500 hover:text-white"
              >
                Log out
              </button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
