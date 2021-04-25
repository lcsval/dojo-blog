import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCtrl.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json()
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.Name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                })
        }, 1000);

        return () => abortCtrl.abort();
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;