import { useState, useEffect } from "react";

// usePaginate custom hook for handling pagination of data.
// It takes an array of data and an optional page size as parameters.

function usePaginate(data, size = 5) {

    // Define state variables for page size, current page, pagination controls, and a sliced list.
    const [pagSize, setPagSize] = useState(size);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [listSlice, setListSlice] = useState([]);

    // Calculate the length of the data array and the start and end indices of the current page.
    const dataLen = data.length;
    const start = (currentPage - 1) * pagSize + (dataLen > 0 ? 1 : 0);
    const end = currentPage * pagSize > dataLen ? dataLen : currentPage * pagSize;

    // Define functions for navigating to the next and previous pages, and to the first page.
    function nextPage() {
        !isLastPage && setCurrentPage(currentPage => currentPage + 1);
    }

    function previousPage() {
        !isFirstPage && setCurrentPage(currentPage => currentPage - 1);
    }

    function getFirstPage() {
        setCurrentPage(1);
    }

    // Use useEffect to update pagination controls and slice the data based on current page and page size.
    useEffect(() => {

        // Determine if the current page is the first or last page.
        if (currentPage >= Math.ceil(dataLen / pagSize))
            setIsLastPage(true);
        else
            setIsLastPage(false);

        if (currentPage === 1)
            setIsFirstPage(true);
        else
            setIsFirstPage(false);

        // Slice the data to display only the current page's content.
        setListSlice(data.slice(start - 1, end));

    }, [currentPage, dataLen, pagSize]);

    // Return an object with various pagination-related properties and functions.
    return {
        listSlice,        // The sliced data for the current page
        dataLen,          // The total length of the data array
        currentPage,      // The current page number
        pagSize,          // The number of items per page
        start,            // The start index of the current page's data
        end,              // The end index of the current page's data
        isFirstPage,      // A boolean indicating if it's the first page
        isLastPage,       // A boolean indicating if it's the last page
        setPagSize,       // Function to set the page size
        nextPage,         // Function to navigate to the next page
        previousPage,     // Function to navigate to the previous page
        setCurrentPage,   // Function to set the current page
        getFirstPage      // Function to navigate to the first page
    };
}

export default usePaginate;
