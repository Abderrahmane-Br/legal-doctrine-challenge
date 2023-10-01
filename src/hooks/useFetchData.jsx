import { useState, useEffect } from "react";

// useFetchData, a hook which fetches data from a URL.
// It accepts the URL as the first parameter and an optional data transformer function.

function useFetchData(url, transformer = null) {

    // Define state variables for data, loading status, and errors
    const [data, setData] = useState(JSON.parse(sessionStorage.getItem("pokemons-list")) || []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {

        let fetchTO = null; // Initialize a timeout variable

        // Check if data already exists in session storage
        if (data.length > 0) {
            // If data exists, set a timeout to mark loading as complete after 2500 milliseconds (2.5 seconds)
            fetchTO = setTimeout(() => {
                setIsLoading(false);
            }, 2500);
        }
        else {

            // If data does not exist, set a timeout to fetch data from the specified URL
            fetchTO = setTimeout(() => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        // Once data is fetched successfully, set loading to false
                        setIsLoading(false);
                        // If a data transformer function is provided, transform the data
                        if (transformer)
                            data = transformer(data);
                        // Update the state with the fetched and possibly transformed data
                        setData(data);
                        // Store the data in session storage for better peformance in future use
                        sessionStorage.setItem("pokemons-list", JSON.stringify(data));
                    })
                    .catch(err => {
                        // If there's an error during the fetch, set loading to false and capture the error
                        setIsLoading(false);
                        setError(err);
                    });
            }, 2500);
        }

        // Cleanup function to clear the timeout in case the component unmounts before the fetch completes
        return () => {
            clearTimeout(fetchTO);
        }
    }, [url]);

    // Return an array containing data, loading status, and error
    return [data, isLoading, error];
}

export default useFetchData;
