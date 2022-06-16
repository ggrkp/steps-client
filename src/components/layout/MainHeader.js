import { NavLink } from 'react-router-dom';
import styles from './MainHeader.module.css'
// ! based on user / admin / unauthorized: different links show up.
const MainHeader = (props) => {
    return (
        <>
            <header className={styles.mainheader}>
                <nav className={`${styles.nav} ${styles['nav-small']} `}>
                    <div className={styles['nav-btn']}>
                        {/* <button className='btn btn-ghost'>Profile</button> */}
                        {/* <button className='btn btn-critical'>Log Out</button> */}
                    </div>
                    <h1 className={styles.logo}>steps </h1>
                    {/* <ul className={`${styles['nav-ul']} ${styles['nav-small']} `}> */}
                    {/* <ul className={`${styles['nav-ul']}`}>
                        <li><NavLink to="#">Home</NavLink></li>
                        <li><NavLink to="#">Stats</NavLink></li>
                        <li><NavLink to="#">Upload</NavLink></li>
                    </ul> */}
                </nav>
            </header>
        </>
    )
}

export default MainHeader