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
            <div className="card-img">
                <h1 className={styles['form-title']}>{formTitle}</h1>
                <h4 className={styles['form-title']}>{formSubtitle}</h4>
            </div>

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
            {currPath === '/login'  && <span>Don't have an account yet?</span>}
            <div className={styles['center']}>
                <button className={`btn ${btnClass}`} onClick={redirectHandler}>
                    {plainText}
                </button>
            </div>
        </Card>
    )


}

export default CardForm