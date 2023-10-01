import { useState, useEffect } from "react";


function useFetchData(url, transformer = null) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => res.json())
                .then(data => {

                    setIsLoading(false);
                    if (transformer)
                        data = transformer(data);
                    setData(data);
                })
                .catch(err => {
                    setIsLoading(false);
                    setError(err);
                });
        }, 2500)
    }, [url])

    return [data, isLoading, error];
}
export default useFetchData;