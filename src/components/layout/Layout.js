import styles from './Layout.module.css'
const Layout = (props) => {
    return (
        <main className={styles['main-container']}>
            { props.children }
        </main>
    )
}

export default Layout