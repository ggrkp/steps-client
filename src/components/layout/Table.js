import styles from './Table.module.css';


const Table = (props) => {

    return (<>

    <table className={styles.table}>
        <tr>
            <th>{props.firstCol}</th>
            <th>{props.secondCol}</th>
        </tr>
        {props.children}
    </table>
    </>
)
}
export default Table 