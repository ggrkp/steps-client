import styles from './Form.module.css'
import Card from '../layout/Card'
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SignupForm = () => (
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

                <Card className={styles['center-card']}>
                    <div class="card-img">
                        <h1 className={styles['form-title']}>Let's Get Started!</h1>
                        <h4 className={styles['form-title']}>Create an account to become a STEPS member!</h4>
                    </div>


                    <Form className={styles.form}>

                        <span className={styles['form-span']} >Name</span>
                        <Field className={styles.field} type="text" name="name" />

                        <span className={styles['form-span']} >E-mail</span>
                        <Field className={styles.field} type="email" name="email" />

                        <span className={styles['form-span']}>Password</span>
                        <Field className={styles.field} type="password" name="password" />

                        <ErrorMessage className='error-msg' name="email" component="div" />
                        <ErrorMessage className='error-msg' name="password" component="div" />
                        {/* <div className={styles["form-btn-section"]}> */}

                        <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                            Create Account
                        </button>
                        {/* </div> */}
                    </Form>
                    <div className={styles['center']}>
                        {/* <span>Already have an account?</span> */}
                        <button className="btn btn-plain">
                            Already have an account? Sign in
                        </button>
                    </div>
                </Card>
            )}
        </Formik>
    </>
);

export default SignupForm;
