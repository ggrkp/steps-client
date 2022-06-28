import { NavLink, useNavigate } from 'react-router-dom';
import styles from './MainHeader.module.css'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
// ! based on user / admin / unauthorized: different links show up.
const MainHeader = (props) => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const logoutHandler = () => {
        navigate('/auth')
        authCtx.logout()
    }
    return (
        <>
            <header className={styles.mainheader}>
                <nav className={`${styles.nav} ${styles['nav-small']} `}>
                    <div className={styles['nav-btn']}>
                        {/* <button className='btn btn-ghost'>Profile</button> */}
                        {isLoggedIn && <button className='btn btn-critical' onClick={logoutHandler}>Log Out</button>}
                    </div>
                    <h1 className={styles.logo}>steps </h1>
                    <ul className={`${styles['nav-ul']} ${styles['nav-small']} `}>
                    {/* <ul className={`${styles['nav-ul']}`}> */}
                        <li><NavLink to="#">Home</NavLink></li>
                        <li><NavLink to="#">Stats</NavLink></li>
                        <li><NavLink to="#">Upload</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader