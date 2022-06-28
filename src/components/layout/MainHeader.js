import { NavLink, useNavigate } from 'react-router-dom';
import styles from './MainHeader.module.css'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
// ! based on user / admin / unauthorized: different links show up.
const MainHeader = (props) => {
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
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
                        {authCtx.isLoggedIn && <button className='btn btn-ghost' onClick={logoutHandler}>Log Out</button>}
                    </div>
                    <h1 className={styles.logo}>steps </h1>
                    <ul className={`${styles['nav-ul']} ${styles['nav-small']} `}>
                        {/* <ul className={`${styles['nav-ul']}`}> */}
                        <li><NavLink to="/profile">Home</NavLink></li>
                        <li><NavLink to="#">Stats</NavLink></li>
                        {(authCtx.isLoggedIn && !authCtx.isAdmin) && <li><NavLink to="/upload">Upload</NavLink></li>}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader