// todo: Forgot password
// todo: Login backend / Tokens etc.


import styles from './Form.module.css'
import { useState } from 'react'
import CardForm from './CardForm'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => {

    const [logData, setLogData] = useState({
        token: '', userId: ''
    })


    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}

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

                onSubmit={(values, { setSubmitting }) => {
                    // ! API CALL TO SEND TO DATABASE.

                    fetch('http://localhost:3000/login', {
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                        .then(response => response.json())
                        .then(data => {
                            // ! Here we will store token information into cookies.
                            // ! also we will store it into context.
                            //! WE GOT THE TOKEN!
                            setLogData({
                                token: data.token,
                                userId: data.id
                            })
                        })
                        .catch(error => { console.error(error) })

                }}
            >
                {({ isSubmitting }) => (

                    <CardForm data={{
                        formTitle: "Login",
                        formSubtitle: 'Please enter your e-mail and password.',
                        plainText: " Create new account",
                        btnClass: "btn-secondary",
                        redirectPath: "/signup"
                    }} >

                        <Form className={styles.form}>

                            <span className={styles['form-span']} >E-mail</span>
                            <Field className={styles.field} type="email" name="email" />

                            <span className={styles['form-span']}>Password</span>
                            <Field className={styles.field} type="password" name="password" />

                            <ErrorMessage className='error-msg' name="email" component="div" />
                            <ErrorMessage className='error-msg' name="password" component="div" />

                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                Sign in
                            </button>
                            {/* <br></br> */}



                        </Form>
                        <button className="btn btn-plain">
                            Forgot your password?
                        </button>
                    </CardForm>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
