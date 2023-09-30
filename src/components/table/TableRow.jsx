function TableRow(props) {

    const cells = Object.entries(props).map(entry => <td key={entry[0]}>{entry[1]}</td>);

    return (
        <tr>
            {cells}
        </tr>
    )
}
export default TableRow