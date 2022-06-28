import styles from './Page404.module.css'
import { useNavigate } from 'react-router-dom'
const Page404 = () => {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/profile')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>   Oops! </h1>
            <h2 className={styles.subtitle}>   The page you were looking for does not exist.</h2>
            <button onClick={clickHandler} className="btn-ghost btn">Home</button>
        </div>
    )
}

export default Page404