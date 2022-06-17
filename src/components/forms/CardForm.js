import styles from './Form.module.css'
import Card from '../layout/Card'
import { useNavigate } from 'react-router-dom';

const CardForm = (props) => {
    const navigate = useNavigate();

    const { formTitle, formSubtitle, plainText, redirectPath } = props.data

    const redirectHandler = () => {
        navigate(`${redirectPath}`);
    }

    return (
        <Card className={styles['center-card']}>
            <div className="card-img">
                <h1 className={styles['form-title']}>{formTitle}</h1>
                <h4 className={styles['form-title']}>{formSubtitle}</h4>
            </div>

            {props.children}
            <div className={styles['center']}>
                {/* <span>Already have an account?</span> */}
                <button className="btn btn-plain" onClick={redirectHandler}>
                    {plainText}
                </button>
            </div>
        </Card>
    )


}

export default CardForm