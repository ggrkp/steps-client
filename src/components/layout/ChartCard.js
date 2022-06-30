import styles from './ChartCard.module.css'
const ChartCard = (props) => {
    return (
        <div className={`${styles['card']} ${props.className}`}>
            <div className={styles['container']}>
                {props.children}
            </div>
        </div>
    )
}

export default ChartCard