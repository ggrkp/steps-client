import styles from './Card.module.css'
const Card = (props) => {
    return (
        <div className={`${styles['card']} ${props.className}`}>
            <div className={styles['container']}>
                {props.children}
            </div>
        </div>
    )
}

export default Card