import { Button } from '@/components/ui/button';
import '../../App.css';
import { Link } from 'react-router-dom';
import ReturnBtn from '@/components/ReturnBtn';
import { useNavigate } from 'react-router-dom';

export function RegisterWelcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/registerpersonalinfo');
  };

  return (
    <>
      <main className="h-screen w-full welcome-bg">
        <ReturnBtn color={'white'} />
        <section className="h-[80%] grid items-center pl-[10%]">
          <div className="md:w-3/5">
            <p className="text-white md:text-[24px] mb-8">
              Fácil y Rápido: Administra tus Citas y Servicios en un Solo Lugar
            </p>
            <h1 className="text-white md:text-[60px] font-semibold">
              Crea tu Cuenta para Agendar Servicios de tu Auto
            </h1>
            <div className="w-1/4 text-center">
              <Button
                onClick={handleClick}
                className="bg-white text-primary hover:text-secondary mt-12 w-52 h-12"
              >
                Empezar Ahora
              </Button>
              <Link to="/login" className="block font-medium text-white mt-8">
                Iniciar sesion
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
