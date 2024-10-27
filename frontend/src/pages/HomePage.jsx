import { NavBar } from '../components/NavBar';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '../components/ServiceCard';
import '../styles/cardsStyles.css';

export function HomePage() {
  return (
    <>
      <section className="bg-hero h-screen bg-cover bg-center relative">
        <NavBar />
        <section className="absolute top-[40%] left-40">
          <div>
            <p className="text-white font-light md:text-[40px]">
              Transforma tu Auto a tu Manera
            </p>
            <p className="text-white font-semibold mb-6 md:text-[60px] md:mr-12">
              Agenda tu Servicio Ahora
            </p>
            <Button className="bg-white text-primary hover:text-secondary md:w-60 lg:h-12 lg:text-[18px]">
              <a href="#servicesCards">Nuestros servicios</a>
            </Button>
          </div>
        </section>
      </section>
      <section>
        <h2
          id="servicesCards"
          className="text-center font-semibold md:text-[45px] mt-32"
        >
          Nuestros servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:p-32 lg:p-36">
          <ServiceCard
            title={'Polarizados'}
            description={'Protección solar y privacidad para tu vehículo.'}
            image={'bg-polarizedCard'}
          />
          <ServiceCard
            title={'Alarmas'}
            description={'La seguridad que tu vehículo necesita.'}
            image={'bg-alarmCard'}
          />
          <ServiceCard
            title={'Radios'}
            description={
              'Actualiza tu sistema de sonido con lo mejor en tecnología.'
            }
            image={'bg-alarmCard'} // Puedes cambiar esto si tienes una imagen diferente para "Radios"
          />
          <ServiceCard
            title={'Avisos'}
            description={'Personaliza tu vehículo con diseños de calidad.'}
            image={'bg-avisosCard'}
          />
        </div>
      </section>
    </>
  );
}
