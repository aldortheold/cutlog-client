import { motion } from 'framer-motion';

export default function Targets() {

    return (
        <motion.div
            className='targets'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Targets & Limits</h2>
        </motion.div>
    );
}