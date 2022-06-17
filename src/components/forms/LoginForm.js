import styles from './Form.module.css'

import CardForm from './CardForm'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => (
    <>
        <Formik
            initialValues={{ name: '', email: '', password: '' }}

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
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);

            }}
        >
            {({ isSubmitting }) => (

                <CardForm data={{
                    formTitle: "Sign In!",
                    formSubtitle: "Use your email and password to sign in.",
                    plainText: "Don't have an account yet? Sign up",
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
                            Sign In
                        </button>
                        
                    </Form>
                </CardForm>
            )}
        </Formik>
    </>
);

export default LoginForm;
