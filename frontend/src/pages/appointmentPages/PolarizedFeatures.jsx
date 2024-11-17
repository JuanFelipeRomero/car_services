import ReturnBtn from '@/components/ReturnBtn';
import PolarizedTypeCard from '@/components/polarizedComponents/PolarizedTypeCard';
import PolarizedOpacityCard from '@/components/polarizedComponents/PolarizedOpacityCard';
import PolarizedCoverageCard from '@/components/polarizedComponents/PolarizedCoverageCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import useAppointmentStore from '@/stores/useAppointmentStore';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export function PolarizedFeatures() {
  const opacity = [
    {
      id: 1,
      value: 5,
      span: 'Máxima oscuridad',
      description:
        'Ofrece el mayor nivel de privacidad y bloquea la mayor cantidad de luz, proporcionando una apariencia muy oscura ideal para quienes buscan máxima discreción',
    },
    {
      id: 2,
      value: 20,
      span: 'Polarizado Oscuro',
      description:
        'Ofrece un buen balance entre privacidad y visibilidad, permitiendo una notable reducción de la luz exterior, manteniendo una apariencia oscura sin comprometer tanto la visibilidad interior.',
    },
    {
      id: 3,
      value: 35,
      span: 'Polarizado Medio',
      description:
        'Reduce la luz y el calor de manera efectiva, pero permite una mayor visibilidad desde el interior. Es una opción intermedia para quienes buscan confort sin una apariencia demasiado',
    },
    {
      id: 4,
      value: 50,
      span: 'Polarizado Ligero',
      description:
        'Ofrece protección solar sin oscurecer demasiado las ventanas, permitiendo una visibilidad clara desde el interior. Ideal para quienes prefieren una reducción de luz suave.',
    },
  ];

  const navigate = useNavigate();

  const {
    data: dataPolarizeTypes,
    loading: loadingPolarize,
    error: errorPolarize,
  } = useFetch(`${apiUrl}/papeles-polarizado`);
  const {
    data: dataCoverage,
    loading: loadingCoverage,
    error: errorCoverage,
  } = useFetch(`${apiUrl}/zonas_polarizado`);

  const { setSelectedPolarizeType } = useAppointmentStore();
  const [selectType, setSelectType] = useState(null);

  const { setSelectedOpacity } = useAppointmentStore();
  const [selectOpacity, setSelectOpacity] = useState(null);

  const { setSelectedCoverage } = useAppointmentStore();
  const [selectCoverage, setSelectCoverage] = useState(null);

  const handleCardTypeClick = (polarizeType) => {
    setSelectType(polarizeType);
  };

  const handleCardOpacityClick = (opacity) => {
    setSelectOpacity(opacity);
  };

  const handleCardCoverageClick = (coverage) => {
    setSelectCoverage(coverage);
  };

  const onClick = () => {
    if (!selectType || !selectOpacity || !selectCoverage) {
      alert('Falta alguna caracteristica por seleccionar');
      return;
    }
    setSelectedPolarizeType(selectType);
    setSelectedOpacity(selectOpacity);
    setSelectedCoverage(selectCoverage);
    navigate('/costandtime');
  };

  if (loadingPolarize || loadingCoverage) {
    return (
      <div className="w-full h-screen flex items-center">
        <span className="block mx-auto text-2xl font-semibold">
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <main className="">
      <ReturnBtn />
      <h1 className=" font-bold md:text-4xl pl-32 mt-12">
        Polarizado de Alta Calidad
      </h1>
      <section className="mt-12 pb-32 border-b-2">
        <h2 className="text-center">Tipos de papel</h2>
        <div className="flex justify-evenly">
          {errorPolarize ? (
            <div className="w-full h-screen flex items-center">
              <span className="block mx-auto text-2xl font-semibold">
                Error al cargar los datos...
              </span>
            </div>
          ) : (
            dataPolarizeTypes.map((polarizado) => {
              const { id, tipo, descripcion, preciometro } = polarizado;
              return (
                <PolarizedTypeCard
                  key={id}
                  image={'../src/assets/productsCards/productopolarizado.png'}
                  description={descripcion}
                  type={tipo}
                  price={preciometro}
                  onClick={() => handleCardTypeClick(polarizado)}
                />
              );
            })
          )}
        </div>
      </section>
      <section className="mt-20 border-b-2 pb-32">
        <h2 className="text-center">Opacidad</h2>
        <div className="px-20 flex gap-12 justify-center">
          {opacity.map((opacidad) => {
            const { id, value, span, description } = opacidad;
            return (
              <PolarizedOpacityCard
                key={id}
                value={value}
                span={span}
                description={description}
                onClick={() => handleCardOpacityClick(opacidad)}
              />
            );
          })}
        </div>
      </section>
      <section className="mt-20 pb-24">
        <h2 className="text-center">Covertura</h2>
        <div className="w-full flex gap-12 justify-center">
          {errorCoverage ? (
            <div className="w-full h-screen flex items-center">
              <span className="block mx-auto text-2xl font-semibold">
                Error al cargar los datos...
              </span>
            </div>
          ) : (
            dataCoverage.map((coverage) => {
              const { id, descripcion, duracion, cantmetros, nombre } =
                coverage;
              return (
                <PolarizedCoverageCard
                  key={id}
                  title={nombre}
                  description={descripcion}
                  onClick={() => handleCardCoverageClick(coverage)}
                />
              );
            })
          )}
        </div>
      </section>
      <Button onClick={onClick} className="w-1/6 mb-20 block mx-auto">
        Siguiente
      </Button>
    </main>
  );
}
