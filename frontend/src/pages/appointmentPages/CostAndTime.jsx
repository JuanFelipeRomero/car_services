import ReturnBtn from '@/components/ReturnBtn';
import CostCard from '@/components/cost and time components/CostCard';
import TimeCard from '@/components/cost and time components/TimeCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function ConstAndTime() {
  const navigate = useNavigate();

  const handeClick = () => {
    navigate('/schedule');
  };

  return (
    <main className="w-full">
      <ReturnBtn />
      <h1 className="text-center font-bold md:text-4xl mt-12">
        Aproximación de tiempo y costo del servicio
      </h1>
      <section className="flex justify-center mt-20 mb-12 gap-12">
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
