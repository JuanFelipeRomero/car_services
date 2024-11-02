import ReturnBtn from '@/components/ReturnBtn';
import { SelectVehicleCard } from '@/components/SelectVehicleCard';
import PolarizedTypeCard from '@/components/polarizedComponents/PolarizedTypeCard';
import PolarizedOpacityCard from '@/components/polarizedComponents/PolarizedOpacityCard';
import PolarizedCoverageCard from '@/components/polarizedComponents/PolarizedCoverageCard';
import {
  FullCoverageIcon,
  LateralsIcon,
  FrontBackIcon,
  LateralIcon,
} from '@/assets/icons/polarizedIcons/PolarizedIcons';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function PolarizedSelectedFeatures() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/costandtime');
  };

  return (
    <main className="w-full">
      <ReturnBtn />
      <h1 className="text-center font-bold md:text-4xl mt-12  mb-16">
        Caracteristicas seleccionadas
      </h1>
      <section className="w-full flex flex-col items-center gap-8">
        <SelectVehicleCard
          marca={'Renault'}
          modelo={'Clio'}
          tipo={'Sedan'}
          placa={'CXV358'}
          select={false}
        />
        <PolarizedTypeCard
          description={`Utiliza nanopartículas para ofrecer la máxima protección contra los
            rayos solares y el calor. Proporciona una claridad superior y es
            altamente resistente, manteniendo el color y la calidad por mucho
            tiempo.`}
          image={'../src/assets/productsCards/productopolarizado.png'}
          title={'Papel polarizado'}
          type={'Nano carbono'}
          price={50000}
          select={false}
        />
        <PolarizedOpacityCard
          opacity={'5%  (Máxima oscuridad)'}
          description={`Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción`}
          select={false}
        />
        <PolarizedCoverageCard
          coverage={'Completo'}
          icon={<FullCoverageIcon />}
          description={'Polarizado del total de las ventanas del vehiculo'}
          select={false}
        />
      </section>
      <Button onClick={handleClick} className="w-1/5 mb-20 block mx-auto mt-16">
        Confirmar
      </Button>
    </main>
  );
}
