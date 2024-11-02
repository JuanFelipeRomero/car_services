import ReturnBtn from '@/components/ReturnBtn';
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

export function PolarizedFeatures() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/selectedpolarizedfeatures');
  };

  return (
    <main className="">
      <ReturnBtn />
      <h1 className=" font-bold md:text-4xl pl-32 mt-12">
        Polarizado de Alta Calidad
      </h1>
      <section className="mt-12 pb-32 border-b-2">
        <h2 className="text-center">Tipos de papel</h2>
        <div className="flex justify-evenly">
          <PolarizedTypeCard
            description={`Utiliza nanopartículas para ofrecer la máxima protección contra los
            rayos solares y el calor. Proporciona una claridad superior y es
            altamente resistente, manteniendo el color y la calidad por mucho
            tiempo.`}
            image={'../src/assets/productsCards/productopolarizado.png'}
            title={'Papel polarizado'}
            type={'Nano carbono'}
            price={50000}
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
          />
        </div>
      </section>
      <section className="mt-20 border-b-2 pb-32">
        <h2 className="text-center">Opacidad</h2>
        <div className="px-20 flex gap-12">
          <PolarizedOpacityCard
            opacity={'5%  (Máxima oscuridad)'}
            description={`Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción`}
          />
          <PolarizedOpacityCard
            opacity={'5%  (Máxima oscuridad)'}
            description={`Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción`}
          />
          <PolarizedOpacityCard
            opacity={'5%  (Máxima oscuridad)'}
            description={`Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción`}
          />
          <PolarizedOpacityCard
            opacity={'5%  (Máxima oscuridad)'}
            description={`Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción`}
          />
        </div>
      </section>
      <section className="mt-20 pb-24">
        <h2 className="text-center">Covertura</h2>
        <div className="w-full flex gap-12 justify-center">
          <PolarizedCoverageCard
            coverage={'Completo'}
            icon={<FullCoverageIcon />}
            description={'Polarizado del total de las ventanas del vehiculo'}
          />
          <PolarizedCoverageCard
            coverage={'Laterales'}
            icon={<LateralsIcon />}
            description={'Polarizado del total de las ventanas del vehiculo'}
          />
          <PolarizedCoverageCard
            coverage={'Frontal / Trasero'}
            icon={<FrontBackIcon />}
            description={'Polarizado del total de las ventanas del vehiculo'}
          />
          <PolarizedCoverageCard
            coverage={'Individual'}
            icon={<LateralIcon />}
            description={'Polarizado del total de las ventanas del vehiculo'}
          />
        </div>
      </section>
      <Button onClick={onClick} className="w-1/6 mb-20 block mx-auto">
        Siguiente
      </Button>
    </main>
  );
}
