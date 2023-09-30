import { useEffect } from "react";
import usePaginate from "../../hooks/usePaginate";
import PropTypes from "prop-types";

function Pagination({ data, setVisibleRows }) {
    const {
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
        previousPage
    } = usePaginate(data);

    useEffect(() => {
        setVisibleRows(listSlice);
    }, [data, listSlice, pagSize]);

    return (
        <div>
            <span>Rows per page
                <select value={pagSize} onChange={e => setPagSize(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                </select>
            </span>
            <span> {`${start} - ${end} of ${dataLen}`} </span>
            <span onClick={previousPage}>{isFirstPage ? " " : "<"} </span>
            <span>{currentPage}</span>
            <span onClick={nextPage}> {isLastPage ? " " : ">"}</span>
        </div>
    )
}
export default Pagination;

Pagination.propTypes = {
    data: PropTypes.array,
    setVisibleRows: PropTypes.func
}