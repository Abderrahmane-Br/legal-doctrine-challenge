import PropTypes from "prop-types";
import TableRow from "./TableRow";
import LoadingSkeleton from "../utils/LoadingSkeleton";

function Table({ data, isLoading }) {


    const pokemons = data.map(item => <TableRow
        key={item.id}
        {...item}
        type={item.type.join(", ")}
    />);

    const skeletons = Array(5).fill(0).map((el, i) =>
    (<tr key={i}>
        {<LoadingSkeleton type="td" content="" samples={10} />}
    </tr>)
    );

    return (
        <table className="pokemon-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Health</th>
                    <th>Attack</th>
                    <th>Defence</th>
                    <th>Special attack</th>
                    <th>Special defence</th>
                    <th>Speed</th>
                    <th>Power</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading
                    ? pokemons
                    : skeletons}
            </tbody>
        </table>
    )
}
export default Table;

Table.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool
}