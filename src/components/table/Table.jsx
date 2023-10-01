import PropTypes from "prop-types";
import TableRow from "./TableRow";

function Table({ data }) {


    const pokemons = data.map(item => <TableRow
        key={item.id}
        {...item}
        type={item.type.join(", ")}
    />
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
                {pokemons}
            </tbody>
        </table>
    )
}
export default Table;

Table.propTypes = {
    data: PropTypes.array
}