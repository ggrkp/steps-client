import styles from './Form.module.css'
import Card from '../layout/Card'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Snackbar from '../layout/Snackbar';

const AuthForm = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const toggleHandler = () => {
        setIsLogin(!isLogin)
    }

    const buttonText = isLogin ? 'Log In' : 'Sign Up'
    const toggleBtnText = isLogin ? 'Create an Account!' : 'Log In'

    const formTitles = isLogin
        ? { title: 'Login', subtitle: 'Enter your credentials.' }
        : { title: 'Signup', subtitle: 'Create a new account and join us.' }


    const initValues = isLogin ? { email: '', password: '' } : { name: '', email: '', password: '', is_admin: false }

    return (


        <Formik
            enableReinitialize={true}
            initialValues={initValues}

            // todo: validate swsta me useState ktl.

            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}



            onSubmit={(values, { setSubmitting, resetForm }) => {
                // ! API CALL TO SEND TO DATABASE.

                // fetch('http://localhost:3000/login', {

                // todo: an einai ola ta pedia valid tote mono kane to request.
                if (isLogin) {
                    fetch('/auth/login', {
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                        .then(response => {
                            alert(JSON.stringify(values, null, 2));
                            if (!response.ok) {
                                throw new Error("Credentials are incorrect! Please try again.")
                            }
                            return response
                        })
                        .then(data => {
                            //! we get the token via cookies. 
                            // alert(JSON.stringify(values, null, 2));
                            console.log(data);
                            console.log('Success, we got the token.');
                            navigate('/profile')
                        })
                        .catch(error => {
                            console.error(error);
                            resetForm()
                        })
                }
                else {
                    fetch('/auth/create', {
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                        .then(response => {
                            if (!response.ok) {
                                throw new Error("Something went wrong. Please try again.")
                            }
                            setShowSnackbar(true)
                            setTimeout(() => setShowSnackbar(false), 3000)
                            console.log('Successfully singed up.')
                            setIsLogin(true)
                            resetForm()
                            // return response
                        })
                        .catch(error => {
                            console.error(error);
                            resetForm()
                        })
                }

            }}
        >
            {({ isSubmitting }) => (

                <Card className={styles['center-card']}>
                    <Snackbar showBar={showSnackbar} snackText="Account created!" />
                    <div className={styles["card-img"]}>
                        <h1 className={styles['form-title']}>{formTitles.title}</h1>
                        <h4 className={styles['form-title']}>{formTitles.subtitle}</h4>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fillOpacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>

                    <Form className={styles.form}>

                        {!isLogin && (<>
                            <span className={styles['form-span']} >Username</span>
                            <Field className={styles.field} type="text" name="name" />
                        </>)}

                        <span className={styles['form-span']} >E-mail</span>
                        <Field className={styles.field} type="email" name="email" />

                        <span className={styles['form-span']}>Password</span>
                        <Field className={styles.field} type="password" name="password" />

                        <ErrorMessage className='error-msg' name="email" component="div" />
                        <ErrorMessage className='error-msg' name="password" component="div" />

                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                            {buttonText}
                        </button>
                        {/* <br></br> */}

                    </Form>
                    {isLogin && <span> Don't have an account yet?</span >}
                    <div className={styles['center']}>
                        <button onClick={toggleHandler} className={`btn ${isLogin ? 'btn-secondary' : 'btn-plain'}`} >
                            {!isLogin && <span> Already have an account ? </span >}
                            {toggleBtnText}
                        </button>
                    </div>
                </Card>
            )}
        </Formik>



    )
}

export default AuthForm