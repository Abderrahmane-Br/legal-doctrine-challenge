import { useState, useEffect } from "react";


function useFetchData(url) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)


    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                setIsLoading(false);
                setData(data);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err);
            })
    }, [url])

    return [data, isLoading, error];
}
export default useFetchData;