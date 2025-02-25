import { useState, useEffect } from 'react';

const useFetch = (fetchFunction, params = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction(params);
                setData(result);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, [fetchFunction, params]);

    return { data, loading, error };
};

export default useFetch;