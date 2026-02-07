import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Stats({ setPage }) {

    useEffect(() => setPage("/stats"));

    return (
        <motion.div
            className='stats'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Weekly Stats</h2>
        </motion.div>
    );
}