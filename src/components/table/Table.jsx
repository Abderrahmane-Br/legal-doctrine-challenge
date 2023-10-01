import PropTypes from "prop-types";
import TableRow from "./TableRow";
import LoadingSkeleton from "../utils/LoadingSkeleton";

function Table({ data, isLoading }) {

    const pokemons = data.map(item => (
        <TableRow
            key={item.id}
            {...item}
            type={item.type.join(", ")}
        />
    ));

    // Create skeleton rows for loading state
    const skeletons = Array(5).fill(0).map((el, i) => (
        <tr key={i}>
            {<LoadingSkeleton type="td" content="" samples={10} />}
        </tr>
    ));

    return (
        <table className="pokemon-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Health</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Special attack</th>
                    <th>Special defense</th>
                    <th>Speed</th>
                    <th>Power</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading
                    ? pokemons // Render Pokemon data if not in loading state
                    : skeletons // Render skeleton rows in loading state
                }
            </tbody>
        </table>
    )
}

// PropTypes for type-checking and documenting component props
Table.propTypes = {
    data: PropTypes.array,   // An array of Pokemon data to be displayed
    isLoading: PropTypes.bool // A boolean indicating whether data is loading
};

// Export the Table component for use in other parts of the application
export default Table;
