const TableRow = (props) => {
    const col1 = props.col1
    const col2 = props.col2
    return (<tr >
        <td>{col1}</td>
        <td>{col2}</td>
    </tr >)
}

export default TableRow