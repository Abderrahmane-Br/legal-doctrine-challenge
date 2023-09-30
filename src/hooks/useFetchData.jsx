import { useState, useEffect } from "react";


function useFetchData(url, transformer = null) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                setIsLoading(false);
                if (transformer)
                    data = transformer(data);
                console.log(data)
                setData(data);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);
            })
    }, [url])

    return [data, setData, isLoading, error];
}
export default useFetchData;