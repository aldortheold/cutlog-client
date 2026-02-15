import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import closeModal from './assets/closeModal';
import { AuthContext } from './assets/AuthContext';
import Alert from './Alert';

export default function LogIn({ setPage }) {

    const navigate = useNavigate();
    
    const authErrorAlert = useRef(null);

    const { authState, setAuthState } = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState("Failed to sign in");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => setPage("/login"));
    
    async function login(event) {
        event.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3001/users/signin",
                { username: username, password: password }
            );
            if (res.data.error) {
                setErrorMessage(res.data.error);
                authErrorAlert.current.showModal();
                setTimeout(() => closeModal(authErrorAlert), 2000);
            }
            else {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState({ username: res.data.username, id: res.data.id, status: true });
                navigate("/");
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
            className='auth login'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Welcome back!</h2>
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <span className="auth-mutual-link">
                    New to CutLog? <Link to="/signup">Create an account</Link>
                </span>
                <button type="submit">Log In</button>
            </form>
            <Alert ref={authErrorAlert} type="error" message={errorMessage} margin="80px" />
        </motion.div>
    );
}