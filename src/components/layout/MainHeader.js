import { NavLink, useNavigate } from 'react-router-dom';
import styles from './MainHeader.module.css'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../store/auth-context'
import axios from 'axios';
// ! based on user / admin / unauthorized: different links show up.
const MainHeader = (props) => {
    const authCtx = useContext(AuthContext)


    const isAdmin = props.role === 'Admin'
    const navigate = useNavigate()

    const logoutHandler = () => {
        navigate('/auth')
        authCtx.logout()
    }
    
    return (
        <>
            <header className={styles.mainheader}>
                <nav className={`${styles.nav} ${styles['nav-small']} `}>
                    <div className={styles['nav-button']}>
                        {/* <button className='button button-ghost'>Profile</button> */}
                        {authCtx.isLoggedIn && <button className='button button-ghost' onClick={logoutHandler}>Log Out</button>}
                    </div>
                    <h1 className={styles.logo}>steps </h1>
                    <ul className={`${styles['nav-ul']} ${styles['nav-small']} `}>
                        
                        {(authCtx.isLoggedIn && isAdmin) && <>
                            <li><NavLink to="/profile">Home</NavLink></li>
                            <li><NavLink to="#">Heatmap</NavLink></li>
                            <li><NavLink to="/upload">Actions</NavLink></li>
                        </>}
                        
                        {(authCtx.isLoggedIn && !isAdmin) && <>
                            <li><NavLink to="/profile">Home</NavLink></li>
                            <li><NavLink to="#">Stats</NavLink></li>
                            <li><NavLink to="/upload">Upload</NavLink></li>
                        </>}
                    </ul>
                    {/* <span className="error-msg">{props.role}</span> */}
                </nav>
            </header>
        </>
    )
}

export default MainHeader