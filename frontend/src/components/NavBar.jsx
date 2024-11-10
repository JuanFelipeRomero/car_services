import { Link } from 'react-router-dom';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import UserIcon from '@/assets/icons/UserIcon';
import useAuthStore from '@/stores/useAuthStore';

export function NavBar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <nav className=" h-24 flex justify-around items-center">
        <span className="font-kanit font-bold italic text-white lg:text-4xl md:text-3xl">
          CarServices
        </span>
        <div className="w-[50%] flex justify-around ">
          <Link to="/" className="text-white lg:text-[18px]">
            Inicio
          </Link>
          <a href="#" className="text-white lg:text-[18px]">
            ¿Quienes somos?
          </a>
          <a href="#" className="text-white lg:text-[18px]">
            Contacto
          </a>
        </div>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/user/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/user/appointments">Citas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Cerrar sesion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/registerwelcome" className="text-white font-medium">
            Iniciar sesion
          </Link>
        )}
      </nav>
    </>
  );
}
