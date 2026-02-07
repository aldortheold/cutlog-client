import { motion } from 'framer-motion';

export default function ExportData() {

    return (
        <motion.div
            className='export-data'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Export Data</h2>
        </motion.div>
    );
}