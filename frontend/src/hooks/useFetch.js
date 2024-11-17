import { useState, useEffect } from 'react';

function useFetch(fetchUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  return { data, loading, error };
}

export default useFetch;
