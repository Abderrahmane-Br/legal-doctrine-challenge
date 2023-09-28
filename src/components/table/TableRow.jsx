function TableRow(props) {

    const cells = Object.entries(props).map(entry => <td key={entry[0]}>{entry[1]}</td>);
    const power = Object.values(props).slice(3).reduce((prev, act) => prev + act);

    return (
        <tr>
            {cells}
            <td>{power}</td>
        </tr>
    )
}
export default TableRow