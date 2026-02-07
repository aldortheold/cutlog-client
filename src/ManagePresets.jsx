import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ManagePresets({ setPage }) {

      useEffect(() => setPage("/presets"));

    return (
        <motion.div
            className='manage-presets'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Manage Presets</h2>
        </motion.div>
    );
}