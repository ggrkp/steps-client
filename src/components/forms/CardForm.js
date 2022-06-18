import styles from './Form.module.css'
import Card from '../layout/Card'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const CardForm = (props) => {



    const navigate = useNavigate();

    const { formTitle, formSubtitle, plainText, btnClass, redirectPath } = props.data
    const location = useLocation();
    const [currPath, setCurrPath] = useState(location.pathname)


    const redirectHandler = () => {
        navigate(`${redirectPath}`);
        setCurrPath(location.pathname)
    }

    return (
        <Card className={styles['center-card']}>
            <div className={styles["card-img"]}>
                <h1 className={styles['form-title']}>{formTitle}</h1>
                <h4 className={styles['form-title']}>{formSubtitle}</h4>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fill-opacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
            {props.children}
            <br></br>
            <hr
                style={{
                    width: '80%',
                    backgroundColor: 'lightgrey',
                    border: 'none',
                    height: '0.5px'
                }}
            />
            {currPath === '/login' && <span>Don't have an account yet?</span>}
            <div className={styles['center']}>
                <button className={`btn ${btnClass}`} onClick={redirectHandler}>
                    {plainText}
                </button>
            </div>
        </Card>
    )


}

export default CardForm