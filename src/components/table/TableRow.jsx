
function TableRow(props) {

    // Map the properties (key-value pairs) of the "props" object to table cells
    // The property name use as id since it's unique in the row
    const cells = Object.entries(props).map(entry => (
        <td key={entry[0]}>{entry[1]}</td>
    ));

    return (
        <tr>
            {cells}
        </tr>
    );
}

export default TableRow;
