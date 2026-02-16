import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from 'framer-motion';
import * as Yup from "yup";
import axios from 'axios';
import closeModal from './assets/closeModal';
import Alert from './Alert';

export default function SignUp({ setPage }) {

    const navigate = useNavigate();

    const authErrorAlert = useRef(null);
    
    const [errorMessage, setErrorMessage] = useState("Failed to register");

    const initialValues = { username: "", password: "", confirmPassword: "" };

    const [passwordFieldType, setPasswordFieldType] = useState("password");
    const [confirmFieldType, setConfirmFieldType] = useState("password");

    useEffect(() => setPage("/signup"));

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
        try {
            const res = await axios.post("http://localhost:3001/users/register", data);
            if (res.data.error) {
                setErrorMessage(res.data.error);
                authErrorAlert.current.showModal();
                setTimeout(() => closeModal(authErrorAlert), 2000);
            }
            else {
                localStorage.setItem("edit-targets", "1");
                navigate("/login");
            }
        }
        catch (error) {
            console.error(error);
            authErrorAlert.current.showModal();
            setTimeout(() => closeModal(authErrorAlert), 2000);
        }
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
                    <div className="password">
                        <Field
                            type={passwordFieldType}
                            autoComplete="off"
                            id="password-field"
                            name="password"
                            placeholder="Create a strong password..."
                        />
                        {passwordFieldType === "password"
                        ? <svg onClick={() => setPasswordFieldType("text")} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                        : <svg onClick={() => setPasswordFieldType("password")} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>}
                    </div>
                    <ErrorMessage name="password" component="span" />
                    <label htmlFor="confirm-field">Confirm password: </label>
                    <div className="password">
                        <Field
                            type={confirmFieldType}
                            autoComplete="off"
                            id="confirm-field"
                            name="confirmPassword"
                            placeholder="Repeat your password here..."
                        />
                        {confirmFieldType === "password"
                        ? <svg onClick={() => setConfirmFieldType("text")} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                        : <svg onClick={() => setConfirmFieldType("password")} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>}
                    </div>
                    <ErrorMessage name="confirmPassword" component="span" />
                    <span className="auth-mutual-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </span>
                    <button type="submit">Sign up</button>
                </Form>
            </Formik>
            <Alert ref={authErrorAlert} type="error" message={errorMessage} margin="20px" />
        </motion.div>
    );
}