import { useState } from 'react';

export function NavBar() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <nav className=" h-24 flex justify-around items-center">
        <span className="font-kanit font-bold italic text-white lg:text-4xl md:text-3xl">
          CarServices
        </span>
        <div className="w-[50%] flex justify-around ">
          <a href="/" className="text-white lg:text-[18px]">
            Inicio
          </a>
          <a href="#" className="text-white lg:text-[18px]">
            ¿Quienes somos?
          </a>
          <a href="#" className="text-white lg:text-[18px]">
            Contacto
          </a>
        </div>
        <a href="/registerwelcome" className="text-white font-medium">
          {isLogged ? 'User' : 'Iniciar sesion'}
        </a>
      </nav>
    </>
  );
}
