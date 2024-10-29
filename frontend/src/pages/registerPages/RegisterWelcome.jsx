import { Button } from '@/components/ui/button';
import '../../App.css';

export function RegisterWelcome() {
  return (
    <>
      <main className="h-screen w-full welcome-bg pt-8">
        <a href={'/'} className="text-white font-medium pl-20">
          Atras
        </a>
        <section className="h-[80%] grid items-center pl-[10%]">
          <div className="md:w-3/5">
            <p className="text-white md:text-[24px] mb-8">
              Fácil y Rápido: Administra tus Citas y Servicios en un Solo Lugar
            </p>
            <h1 className="text-white md:text-[60px] font-semibold">
              Crea tu Cuenta para Agendar Servicios de tu Auto
            </h1>
            <div className="w-1/4 text-center">
              <Button className="bg-white text-primary hover:text-secondary mt-12 w-52 h-12">
                <a href="/registerpersonalinfo">Empezar Ahora</a>
              </Button>
              <a href="/login" className="block font-medium text-white mt-8">
                Iniciar sesion
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
