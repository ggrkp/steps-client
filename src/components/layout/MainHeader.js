import { NavLink, useNavigate } from 'react-router-dom';
import styles from './MainHeader.module.css'
import { useContext } from 'react'
import AuthContext from '../../store/auth-context'
import AdminContext from '../../store/admin-context'
import UserContext from '../../store/user-context'
// ! based on user / admin / unauthorized: different links show up.
const MainHeader = (props) => {
    const authCtx = useContext(AuthContext)
    const userCtx = useContext(UserContext)
    const adminCtx = useContext(AdminContext)


    const isAdmin = props.isAdmin
    const navigate = useNavigate()

    const logoutHandler = () => {
        navigate('/auth')
        authCtx.logout()
        adminCtx.clearDashData()
        adminCtx.clearMapData()
        userCtx.clearUserData()
    }

    return (
        <>
            <header className={styles.mainheader}>
                <nav className={`${styles.nav} ${styles['nav-small']} `}>
                    <div className={styles['nav-button']}>

                        {authCtx.isLoggedIn &&
                            <button
                                className='button button-ghost nav-btn'
                                onClick={logoutHandler}>Log Out&nbsp;&nbsp;
                                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            </button>}
                        {/* <button className='button button-ghost'>Profile</button> */}
                    </div>
                    <h1 className={styles.logo}><i class="fa-solid fa-leaf"></i>steps </h1>
                    <ul className={`${styles['nav-ul']} ${styles['nav-small']} `}>

                        {(authCtx.isLoggedIn && isAdmin) && <>
                            <li><NavLink
                                to="/profile">
                                <i class="fa-solid fa-house"></i>&nbsp;&nbsp;
                                <span className="sm-hide">Home</span>
                            </NavLink>
                            </li>
                            <li><NavLink
                                to="/heatmap">
                                <i class="fa-solid fa-map-location-dot"></i>&nbsp;&nbsp;
                                <span className="sm-hide">Heatmap</span>
                            </NavLink>
                            </li>
                            {/* <li > <a href="javascript:void(0)" className={styles.delete}><i class="fa-solid fa-trash-can"></i>&nbsp;&nbsp;<span className="sm-hide">Delete Data</span> </a>


                            </li> */}
                        </>}

                        {(authCtx.isLoggedIn && !isAdmin) && <>
                            <li>
                                <NavLink
                                    to="/profile">
                                    <i class="fa-solid fa-house"></i>
                                    &nbsp;&nbsp;
                                    <span className="sm-hide">Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#">
                                    <i class="fa-solid fa-chart-line"></i>
                                    &nbsp;&nbsp;
                                    <span className="sm-hide">Stats</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/upload">
                                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                    &nbsp;&nbsp;
                                    <span className="sm-hide">Upload</span>
                                </NavLink>
                            </li>
                        </>}
                    </ul>

                </nav>
            </header>
        </>
    )
}

export default MainHeader