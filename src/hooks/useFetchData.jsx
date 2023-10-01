import { useState, useEffect } from "react";


function useFetchData(url, transformer = null) {

    const [data, setData] = useState(JSON.parse(sessionStorage.getItem("pokemons-list")) || []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        let fetchTO = null;
        if (data.length > 0) {
            fetchTO = setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
        else {
            fetchTO = setTimeout(() => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {

                        setIsLoading(false);
                        if (transformer)
                            data = transformer(data);
                        setData(data);
                        sessionStorage.setItem("pokemons-list", JSON.stringify(data));
                    })
                    .catch(err => {
                        setIsLoading(false);
                        setError(err);
                    });
            }, 2500);
        }

        return () => {
            clearTimeout(fetchTO);
        }
    }, [url])

    return [data, isLoading, error];
}
export default useFetchData;