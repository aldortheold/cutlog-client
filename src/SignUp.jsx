import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SignUp({ setPage }) {

    useEffect(() => setPage("/signup"));

    const initialValues = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup
            .string()
            .trim()
            .required("Username is a required field!")
            .min(3, "Username must be at least 3 characters long!")
            .max(15, "Username can be at most 15 characters long!")
            .matches(/^[A-Za-z0-9_]+$/, "You can only use latin letters, numbers and underscores for your username!"),
        password: Yup
            .string()
            .required("Password is a required field!")
            .min(8, "Password must be at least 8 characters long!")
            .max(30, "Password can be at most 30 characters long!"),
        confirmPassword: Yup
            .string()
            .required("You must confirm your password!")
            .oneOf([Yup.ref("password"), null], "Passwords do not match!"),
    });

    async function register(data) {
        axios.post("http://localhost:3001/users/register", data)
        .then(response => alert(response.data));
    }

    return (
        <motion.div
            className='auth signup'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Create an account</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={register}
                validationSchema={validationSchema}
            >
                <Form>
                    <label htmlFor="username-field">Username: </label>
                    <Field
                        autoComplete="off"
                        id="username-field"
                        name="username"
                        placeholder="Example: JayCutler..."
                    />
                    <ErrorMessage name="username" component="span" />
                    <label htmlFor="password-field">Password: </label>
                    <Field
                        autoComplete="off"
                        id="password-field"
                        name="password"
                        placeholder="Create a strong password..."
                    />
                    <ErrorMessage name="password" component="span" />
                    <label htmlFor="confirm-field">Confirm password: </label>
                    <Field
                        autoComplete="off"
                        id="confirm-field"
                        name="confirmPassword"
                        placeholder="Repeat your password here..."
                    />
                    <ErrorMessage name="confirmPassword" component="span" />
                    <span className="auth-mutual-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </span>
                    <button type="submit">Sign Up</button>
                </Form>
            </Formik>
        </motion.div>
    );
}