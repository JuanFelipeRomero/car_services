import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import ReturnBtn from './ReturnBtn';

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
import { User } from 'lucide-react';

// Menu items.
const items = [
  {
    title: 'Información personal',
    url: '/',
    icon: User,
  },
  {
    title: 'Citas agendadas',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Log out',
    url: '#',
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <ReturnBtn />
          <SidebarGroupLabel className="text-3xl">Usuario</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
