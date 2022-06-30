import styles from './ProfileCard.module.css'
const ProfileCard = (props) => {
    return (
        <div className={`${styles['card']} ${props.className}`}>

            <div className={styles['container']}>
                <div className={styles["card-img"]}>
                    <h5 className={styles['form-title']}>{props.title}</h5>
                    {/* <h6 className={styles['form-title']}>{props.subtitle}</h6> */}
                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fillOpacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg> */}
                {props.children}
            </div>
        </div>
    )
}

export default ProfileCard