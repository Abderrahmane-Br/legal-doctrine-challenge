import { useState, useEffect } from "react";

function usePaginate(data, size = 5) {

    const [pagSize, setPagSize] = useState(size);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [listSlice, setListSlice] = useState([]);

    const dataLen = data.length;
    const start = (currentPage - 1) * pagSize + dataLen > 0 ? 1 : 0;
    const end = (currentPage * pagSize) > dataLen ? dataLen : (currentPage * pagSize);

    function nextPage() {
        !isLastPage && setCurrentPage(currentPage => currentPage + 1);
    }

    function previousPage() {
        !isFirstPage && setCurrentPage(currentPage => currentPage - 1);
    }

    function getFirstPage() {
        setCurrentPage(1);
    }
    useEffect(() => {

        if (currentPage >= Math.ceil(dataLen / pagSize))
            setIsLastPage(true);
        else
            setIsLastPage(false);

        if (currentPage == 1)
            setIsFirstPage(true);
        else
            setIsFirstPage(false);

        setListSlice(data.slice(start - 1, end));

    }, [currentPage, dataLen, pagSize]);


    return {
        listSlice,
        dataLen,
        currentPage,
        pagSize,
        start,
        end,
        isFirstPage,
        isLastPage,
        setPagSize,
        nextPage,
        previousPage,
        setCurrentPage,
        getFirstPage
    }
}
export default usePaginate