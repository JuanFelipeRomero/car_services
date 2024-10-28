import { NavBar } from '../components/NavBar';
import { Button } from '@/components/ui/button';

export function PolarizedInfo() {
  return (
    <>
      <section className="bg-darkgray h-screen">
        <header>
          <NavBar></NavBar>
        </header>
        <section className="flex lg:mt-28 px-24 justify-around">
          <section className="lg:w-3/5">
            <article>
              <h1 className="text-white font-semibold lg:text-[54px] md:text-[44px]">
                Polarizado de alta calidad
              </h1>
              <p className="text-white md:text-[18px] mt-8 mb-16 lg:w-3/4">
                Ofrecemos un servicio profesional de instalación de polarizados
                de alta calidad para vehículos. Contamos con una amplia variedad
                de tipos, desde cerámico hasta nanocerámico y carbono, que
                brindan protección contra los rayos UV, reducen el calor y
                mejoran la estética de tu auto. Nos aseguramos de una aplicación
                precisa, libre de burbujas, y con durabilidad garantizada.
                Mejora la privacidad y confort dentro de tu vehículo con un
                polarizado instalado por expertos.
              </p>
            </article>
            <article className="flex gap-48">
              <div>
                <h3 className="text-white font-medium md:text-[28px] mb-4">
                  Tipos de papel
                </h3>
                <ul className="text-white lg:text-[18px] pl-2">
                  <li>Ceramico</li>
                  <li>Nano Ceramico</li>
                  <li>Carbono</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium md:text-[28px] mb-4">
                  Grado de opacidad
                </h3>
                <ul className="text-white lg:text-[18px] pl-2">
                  <li>5% (Maxima oscuridad) </li>
                  <li>20% (Polarizado Oscuro)</li>
                  <li>35% (Polarizado Medio)</li>
                  <li>50% (Polarizado Ligero)</li>
                </ul>
              </div>
            </article>
          </section>
          <div className="grid items-center">
            <img
              src="../src/assets/servicesInfoImg/polarizedCarImage.png"
              alt="imagen camioneta polarizada"
            />
            <Button className="bg-white text-primary hover:text-secondary m-auto lg:w-48 md:h-12">
              <a>Agenda Cita</a>
            </Button>
          </div>
        </section>
      </section>
    </>
  );
}
