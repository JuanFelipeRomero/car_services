export function ServiceCard({ title, description, image }) {
  return (
    <div
      className={`${image}  bg-cover bg-center p-6 rounded-[28px] shadow-lg md:h-[400px] hover:h-[450px] transition-all`}
    >
      <p className="text-white font-semibold md:text-[24px] lg:text-[36px] mb-2">
        {title}
      </p>
      <p className="text-white md:text-[18px] lg:text-[24px]">{description}</p>
    </div>
  );
}
