import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function LogIn({ setPage }) {

    useEffect(() => setPage("/login"));

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function login() {
        axios.post(
            "http://localhost:3001/users/signin",
            { username: username, password: password }
        ).then(response => console.log(response.data));
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
            <form>
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
                <button type="submit" onClick={login}>Log In</button>
            </form>
        </motion.div>
    );
}