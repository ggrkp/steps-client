import styles from './Page404.module.css'
import { useNavigate } from 'react-router-dom'
const Page404 = () => {
    const navigate = useNavigate()
    const clickHandler = () => {
        navigate('/profile')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}> <i class="fa-solid fa-triangle-exclamation"></i>  </h1>
            <h2 className={styles.subtitle}>   The page you were looking for does not exist.</h2>
            <button onClick={clickHandler} className="button-ghost button">Back to Home</button>
        </div>
    )
}

export default Page404