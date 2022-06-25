import styles from './Snackbar.module.css'

const Snackbar = (props) => {
    let classes = props.showBar ? `${styles.snackbar} ${styles.show}` : `${styles.snackbar}`

    return (
        <div className={classes} >
            {props.snackText}
        </div >)
}

export default Snackbar