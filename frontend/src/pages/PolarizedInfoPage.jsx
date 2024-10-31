import { NavBar } from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { InfoCard } from '../components/InfoCard';
import { PolarizedProductCard } from '@/components/PolarizedProductCard';
import { Link } from 'react-router-dom';

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
              <Link to="/selectcar">Agenda Cita</Link>
            </Button>
          </div>
        </section>
      </section>

      <section>
        <div className="flex justify-evenly px-40 py-20 gap-20">
          <InfoCard
            title={'Polarizado Ceramico'}
            description={`Este tipo de polarizado ofrece excelente protección solar y reduce el
          calor de manera eficiente sin interferir con las señales electrónicas.
          Es ideal para quienes buscan confort térmico y mayor durabilidad sin
          perder la claridad de visión desde el interior.`}
          />
          <InfoCard
            title={'Polarizado NanoCeramico'}
            description={`Utiliza nanopartículas para ofrecer la máxima protección contra los rayos 
              solares y el calor. Proporciona una claridad superior y es altamente resistente, 
              manteniendo el color y la calidad por mucho tiempo.`}
          />
          <InfoCard
            title={'Polarizado Carbono'}
            description={`Este polarizado utiliza partículas de carbono para bloquear los rayos infrarrojos,
              ofreciendo un aspecto oscuro y elegante. Es duradero, no se decolora con el tiempo y 
              ofrecebuena protección contra el calor y los rayos UV.`}
          />
        </div>
        <div className="grid place-items-center text-center">
          <h2 className="text-center font-bold md:text-[40px]">
            Grados de opacidad
          </h2>
          <img
            src="../src/assets/servicesInfoImg/porcentajes_opacidad.png"
            alt="Imagen para ilustrar los diferentes grados de opacidad en papeles polarizados"
            className="my-12"
          />
          <p className="md:w-2/3">
            Los grados de opacidad del papel polarizado varían de 5% a 50%,
            permitiendo controlar la cantidad de luz que entra al vehículo. Un
            porcentaje menor indica mayor bloqueo de luz, ofreciendo más
            privacidad y reducción del deslumbramiento.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-center ">Los productos que utilizamos</h2>
        <div className="flex justify-evenly">
          <PolarizedProductCard
            image={'../src/assets/productsCards/productopolarizado.png'}
            title={'Papel polarizado'}
            type={'Nano carbono'}
            opacity={'5%'}
            price={50000}
          />
          <PolarizedProductCard
            image={'../src/assets/productsCards/productopolarizado.png'}
            title={'Papel polarizado'}
            type={'Nano carbono'}
            opacity={'5%'}
            price={50000}
          />
          <PolarizedProductCard
            image={'../src/assets/productsCards/productopolarizado.png'}
            title={'Papel polarizado'}
            type={'Nano carbono'}
            opacity={'5%'}
            price={50000}
          />
          <PolarizedProductCard
            image={'../src/assets/productsCards/productopolarizado.png'}
            title={'Papel polarizado'}
            type={'Nano carbono'}
            opacity={'5%'}
            price={50000}
          />
        </div>
        <p className=" text-center lg:w-2/3 my-20 m-auto ">
          En nuestro servicio de instalación de polarizados, utilizamos
          exclusivamente marcas de alta calidad, garantizando que los productos
          sean duraderos, eficientes y ofrezcan la mejor protección contra los
          rayos UV y el calor. Trabajamos con materiales de confianza que
          aseguran un acabado profesional, resistente a decoloraciones y daños.
        </p>
      </section>
    </>
  );
}
