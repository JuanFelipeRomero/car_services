import ReturnBtn from '@/components/ReturnBtn';
import CostCard from '@/components/cost and time components/CostCard';
import TimeCard from '@/components/cost and time components/TimeCard';
import { SelectedFeatureCard } from '@/components/selectedFeaturesComponents/SelectedFeatureCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import calculateTimeAndCosts from '@/logic/calculateTimeAndCost';

export default function ConstAndTime() {
  const navigate = useNavigate();

  const appointmentFeatures = localStorage.getItem('appointment-storage');
  const parsedFeatures = JSON.parse(appointmentFeatures);

  console.log(parsedFeatures.state.selectedPolarizeType);
  console.log(parsedFeatures.state.selectedOpacity);
  console.log(parsedFeatures.state.selectedCoverage);

  const polarizeType = parsedFeatures.state.selectedPolarizeType.tipo;
  const polarizeCoverage = parsedFeatures.state.selectedCoverage.nombre;
  const polarizeMeterPrice =
    parsedFeatures.state.selectedPolarizeType.preciometro;
  const polarizeMeters = parseFloat(
    parsedFeatures.state.selectedCoverage.cantmetros
  );
  const polarizeMinutes = parsedFeatures.state.selectedCoverage.duracion;

  const { totalCost, totalTime } = calculateTimeAndCosts(
    polarizeMeterPrice,
    polarizeMeters,
    polarizeCoverage,
    polarizeMinutes
  );

  console.log(totalCost);
  console.log(totalTime);

  const features = [
    {
      id: 1,
      title: 'Vehiculo',
      info: parsedFeatures.state.selectedVehicle.placa,
    },
    {
      id: 2,
      title: 'Tipo de papel',
      info: polarizeType,
    },
    {
      id: 3,
      title: 'Opacidad',
      info: parsedFeatures.state.selectedOpacity.value,
    },
    {
      id: 4,
      title: 'Vehiculo',
      info: parsedFeatures.state.selectedCoverage.nombre,
    },
  ];

  const handeClick = () => {
    navigate('/schedule');
  };

  return (
    <main className="w-full">
      <ReturnBtn />
      <h1 className="text-center font-bold md:text-4xl mt-12">
        Aproximación de tiempo y costo del servicio
      </h1>
      <section className="mt-8 text-center flex justify-center gap-12">
        {features.map((feature) => {
          const { id, title, info } = feature;
          return <SelectedFeatureCard key={id} title={title} info={info} />;
        })}
      </section>
      <section className="flex justify-center mt-12 mb-12 gap-12">
        <CostCard
          type={'Ceramico'}
          meterPrice={38000}
          covert={'Laterales'}
          meters={2}
        />
        <TimeCard time={2} covert={'Laterales'} />
      </section>
      <section className="text-center">
        <strong className="md:text-3xl mb-4 block">¡ADVERTENCIA!</strong>
        <p className="text-gray-500 w-1/2 m-auto">
          Estimado cliente, tenga en cuenta que los valores calculados son
          solmente aproximaciones. La duracion y el costo puede aumentar al
          momento de prestar el servicio
        </p>
      </section>
      <Button onClick={handeClick} className="w-1/6 mx-auto block mt-8">
        Siguiente
      </Button>
    </main>
  );
}
