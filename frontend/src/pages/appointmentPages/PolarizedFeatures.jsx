import ReturnBtn from '@/components/ReturnBtn';
import PolarizedTypeCard from '@/components/polarizedComponents/PolarizedTypeCard';

export function PolarizedFeatures() {
  return (
    <main className="pt-8">
      <ReturnBtn />
      <h1 className=" font-bold md:text-4xl pl-32 mt-12">
        Polarizado de Alta Calidad
      </h1>
      <section className="mt-12 border-b-2">
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
            opacity={'5%'}
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
            opacity={'5%'}
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
            opacity={'5%'}
            price={50000}
          />
        </div>
      </section>
      <section></section>
    </main>
  );
}
