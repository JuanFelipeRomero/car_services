import { useNavigate } from 'react-router-dom';

export default function ReturnBtn({ color = 'black' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBack} className={`text-${color} font-medium pl-20`}>
      Atras
    </button>
  );
}
