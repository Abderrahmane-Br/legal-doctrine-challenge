import { useEffect } from "react";
import usePaginate from "../../hooks/usePaginate";
import PropTypes from "prop-types";
import leftChevron from "../../assets/images/chevron-left.svg";
import rightChevron from "../../assets/images/chevron-right.svg";

function Pagination({ data, setVisibleRows }) {
    // Destructure values from the usePaginate hook
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

    // Use useEffect to update visible rows when data loads or when user changes the current page or the page size
    useEffect(() => {
        setVisibleRows(listSlice);
    }, [data, listSlice, pagSize]);

    // Use useEffect to navigate to the first-page when search results change.
    useEffect(() => {
        getFirstPage();
    }, [data]);

    return (
        <div className="pagination">
            <span>Rows per page</span>
            <select
                value={pagSize}
                className="pagination__size"
                onChange={e => setPagSize(e.target.value)}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <span> {`${start} - ${end} of ${dataLen}`} </span>
            {/* Display left chevron for previous page navigation */}
            <img
                src={leftChevron}
                alt="pagination nav icon"
                onClick={previousPage}
                className={`pagination__page-nav ${isFirstPage ? "--inactive" : ""}`}
            />
            <span>{currentPage}</span>
            {/* Display right chevron for next page navigation */}
            <img
                src={rightChevron}
                alt="pagination nav icon"
                onClick={nextPage}
                className={`pagination__page-nav ${isLastPage ? "--inactive" : ""}`}
            />
        </div>
    );
}

// PropTypes for type-checking and documenting component props
Pagination.propTypes = {
    data: PropTypes.array,          // An array of data to paginate
    setVisibleRows: PropTypes.func  // Function to update the visible rows
};

export default Pagination;
