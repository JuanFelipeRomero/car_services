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
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logOut = useAuthStore((state) => state.logout);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logOut();
    navigate('/');
  };

  return (
    <>
      <nav className=" h-24 flex justify-around items-center">
        <Link
          to={'/'}
          className="font-kanit font-bold italic text-white lg:text-4xl md:text-3xl"
        >
          CarServices
        </Link>
        <div className="w-[50%] flex justify-around ">
          <Link to="/" className="text-white lg:text-[18px] mr-28">
            Nuestros servicios
          </Link>
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
                <button onClick={handleLogOut}>Cerrar sesion</button>
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
