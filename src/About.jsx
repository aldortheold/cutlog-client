import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function About({ setPage }) {

    useEffect(() => setPage("/about"));

    return (
        <motion.div
            className='about'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>About</h2>
        </motion.div>
    );
}