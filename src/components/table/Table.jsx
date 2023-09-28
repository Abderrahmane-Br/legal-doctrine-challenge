import useFetchData from "../../hooks/useFetchData";
import TableRow from "./TableRow";

function Table() {
    // const [data, setData] = useState([]);

    const [data] = useFetchData("./src/assets/data/pokemon.json");
    const pokemons = data.map(item => <TableRow
        key={item.id}
        {...item}
        type={item.type.join(", ")} />
    );

    return (
        <table>
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
export default Table