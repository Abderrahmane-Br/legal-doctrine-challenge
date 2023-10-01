import { useEffect } from "react";
import usePaginate from "../../hooks/usePaginate";
import PropTypes from "prop-types";
import leftChevron from "../../assets/images/chevron-left.svg";
import rightChevron from "../../assets/images/chevron-right.svg";

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
        previousPage,
        getFirstPage
    } = usePaginate(data);

    useEffect(() => {
        setVisibleRows(listSlice);
    }, [data, listSlice, pagSize]);

    useEffect(() => { getFirstPage() }, [data]);

    return (
        <div className="pagination">
            <span>Rows per page</span>
            <select
                value={pagSize}
                className="pagination__size"
                onChange={e => setPagSize(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <span> {`${start} - ${end} of ${dataLen}`} </span>
            <img
                src={leftChevron}
                onClick={previousPage}
                className={`pagination__page-nav ${isFirstPage ? "--inactive" : ""}`}
            />
            <span>{currentPage}</span>
            <img
                src={rightChevron}
                onClick={nextPage}
                className={`pagination__page-nav ${isLastPage ? "--inactive" : ""}`}
            />
        </div>
    )
}
export default Pagination;

Pagination.propTypes = {
    data: PropTypes.array,
    setVisibleRows: PropTypes.func
}