import ReturnBtn from '@/components/ReturnBtn';
import CostCard from '@/components/cost and time components/CostCard';
import TimeCard from '@/components/cost and time components/TimeCard';
import { SelectedFeatureCard } from '@/components/selectedFeaturesComponents/SelectedFeatureCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import calculateTimeAndCosts from '@/logic/calculateTimeAndCost';
import useAppointmentStore from '@/stores/useAppointmentStore';

export default function ConstAndTime() {
  const navigate = useNavigate();

  //Invocar las actions de la store
  const { setTotalCost, setTotalTime } = useAppointmentStore();

  //Obtener la informacion de las caracteristicas seleccionadas hasta el momento
  const appointmentFeatures = localStorage.getItem('appointment-storage');
  const parsedFeatures = JSON.parse(appointmentFeatures);

  //asignar las variables necesitadas hasta el momento
  const vehicleType = parsedFeatures.state.selectedVehicle.tipo;
  const polarizeType = parsedFeatures.state.selectedPolarizeType.tipo;
  const polarizeCoverage = parsedFeatures.state.selectedCoverage.nombre;
  const polarizeMeterPrice =
    parsedFeatures.state.selectedPolarizeType.preciometro;
  const polarizeMeters = parseFloat(
    parsedFeatures.state.selectedCoverage.cantmetros
  );
  const polarizeMinutes = parsedFeatures.state.selectedCoverage.duracion;

  //Invocar la funcoin para calcular el costo y el tiempo
  const { totalCost, totalTime, workPrice } = calculateTimeAndCosts(
    vehicleType,
    polarizeMeterPrice,
    polarizeMeters,
    polarizeCoverage,
    polarizeMinutes
  );

  //Array de features para las cards
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
    setTotalCost(totalCost);
    setTotalTime(totalTime);
    navigate('/schedule');
  };

  return (
    <main className="w-full">
      <ReturnBtn />
      <h1 className="text-center font-bold md:text-4xl mt-8">
        Aproximación de tiempo y costo del servicio
      </h1>
      <section className="mt-8 text-center flex justify-center gap-12">
        {features.map((feature) => {
          const { id, title, info } = feature;
          return <SelectedFeatureCard key={id} title={title} info={info} />;
        })}
      </section>
      <section className="flex justify-center mt-6 mb-12 gap-12">
        <CostCard
          totalCost={totalCost}
          type={polarizeType}
          meterPrice={polarizeMeterPrice}
          covert={polarizeCoverage}
          meters={polarizeMeters}
          workPrice={workPrice}
        />
        <TimeCard time={totalTime} covert={polarizeCoverage} />
      </section>
      <section className="text-center">
        <strong className="md:text-2xl mb-4 block">¡ADVERTENCIA!</strong>
        <p className="text-gray-500 w-1/2 m-auto">
          Estimado cliente, tenga en cuenta que los valores calculados son
          solmente aproximaciones. La duracion y el costo puede aumentar al
          momento de prestar el servicio
        </p>
      </section>
      <Button onClick={handeClick} className="w-1/6 mx-auto block mt-4">
        Siguiente
      </Button>
    </main>
  );
}
