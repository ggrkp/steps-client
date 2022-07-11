import styles from './Form.module.css'
import Card from '../layout/Card'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import AdminContext from '../../store/admin-context'
import UserContext from '../../store/user-context'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Snackbar from '../layout/Snackbar';

const AuthForm = () => {

    const authCtx = useContext(AuthContext)
    const adminCtx = useContext(AdminContext)
    const userCtx = useContext(UserContext)
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const toggleHandler = () => {
        setIsLogin(!isLogin)
    }


    const togglePwHandler = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    const buttonText = isLogin ? <span key='key-login'>Log in &nbsp;&nbsp;<i class="fa-solid fa-arrow-right-to-bracket"></i></span> : <span key='key-signup'>Sign up &nbsp;&nbsp;<i class="fa-solid fa-user-plus"></i></span>
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
                // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
                const usernameRegex = /^[a-zA-Z0-9]+$/;
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Password is required';
                }
                if (!isLogin) {

                    if (!values.name) {
                        errors.name = 'Username is required.'
                    }
                    else if (!usernameRegex.test(values.name)) {
                        errors.name = 'Username should contain only letters and numbers.'
                    }

                    if (values.password.length < 6) {
                        errors.password = 'Password must be at least 6 characters long';
                    }
                    else if (
                        !strongRegex.test(values.password)) {
                        errors.password = 'Password should contain at least 1 lowercase, 1 uppercase letter, 1 number and 1 special character.';
                    }
                }

                return errors;
            }}



            onSubmit={(values, { setSubmitting, resetForm }) => {
                const apiUrl = isLogin ? 'http://localhost:3000/auth/login' : 'http://localhost:3000/auth/signup'


                axios.post(apiUrl, values)
                    .then(res => {
                        if (!res.statusText === 'OK') {
                            throw new Error('Error: ' + res.statusText)
                        }
                        // * Login handler - Log the user in
                        if (isLogin) {
                            const expirationTime = new Date(new Date().getTime() + 3600000)

                            authCtx.login(res.data.token, res.data.isAdmin, expirationTime.toISOString());
                            if (isLogin) {
                                if (res.data.isAdmin) {
                                    adminCtx.fetchDashData(res.data.token)
                                    // adminCtx.fetchMapData(res.data.token)
                                }
                                else if (!res.data.isAdmin) {
                                    userCtx.fetchUserData(res.data.token)
                                }
                            }
                            navigate('/profile')
                        }
                        else {
                            setShowSnackbar(true)
                            setTimeout(() => setShowSnackbar(false), 3000)
                            console.log('Successfully singed up!')
                            setIsLogin(true)
                            resetForm()
                        }

                    })
                    .catch(err => {
                        setSubmitting(false)
                        setErrorMsg(err.response.data)
                        setTimeout(() => { setErrorMsg(null) }, 7000)

                    })

            }}
        >
            {({ isSubmitting }) => (

                <Card className={styles['center-card']}>
                    <Snackbar showBar={showSnackbar} snackText="Account created!" />
                    <div className={styles["card-img"]}>
                        <h1 className={styles['form-title']}>{formTitles.title}</h1>
                        <h4 className={styles['form-title']}>{formTitles.subtitle}</h4>
                    </div>
                    <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fillOpacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>

                    <Form className={styles.form}>

                        {!isLogin && (<>
                            <span className={styles['form-span']} >Username</span>
                            <Field className={styles.field} type="text" name="name" />
                            <ErrorMessage className='error-msg' name="name" component="div" />
                        </>)}

                        <span className={styles['form-span']} >E-mail</span>
                        <Field className={styles.field} type="text" name="email" />
                        <ErrorMessage className='error-msg' name="email" component="div" />

                        <span className={styles['form-span']}>Password{showPassword
                            ? <button className="btn-icon" key="hide" onClick={togglePwHandler} ><i className="fas fa-eye-slash icon-button"></i></button>
                            : <button className="btn-icon" key="show" onClick={togglePwHandler} ><i className="fas fa-eye icon-button"></i></button>
                        }


                        </span>
                        <Field className={styles.field} type={showPassword ? "text" : "password"} name="password" />
                        <ErrorMessage className='error-msg' name="password" component="div" />

                        <button className="button button-prim" type="submit" disabled={isSubmitting}>
                            {buttonText}
                        </button>

                    </Form>
                    <span className="error-msg">{errorMsg}</span>
                    {isLogin && <span> Don't have an account yet?</span >}
                    <div className={styles['center']}>
                        <button onClick={toggleHandler} className={`button ${isLogin ? 'button-sec' : 'button-plain'}`} >
                            {!isLogin && <span>Already have an account ?</span >}
                            {toggleBtnText}
                        </button>
                    </div>
                </Card>
            )}
        </Formik>



    )
}

export default AuthForm