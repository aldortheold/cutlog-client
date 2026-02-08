import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {

    return (
        <motion.div
            className='not-found'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <svg id="not-found-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 240">
                <text x="50" y="170" fontSize="140" fontWeight="700" fill="var(--color)" fontFamily="Jost">4</text>
                <g transform="translate(170, 25)">
                    <path d="M100 0 C40 0, 0 40, 0 90 C0 150, 40 190, 100 210 C160 190, 200 150, 200 90 C200 40, 160 0, 100 0 Z" fill="#5fbf65"/>
                    <path d="M100 15 V195" stroke="#3a8f45" strokeWidth="6" strokeLinecap="round" opacity="0.6"/>
                    <path d="M100 60 C70 80, 55 100, 50 130" stroke="#3a8f45" strokeWidth="4" fill="none" opacity="0.5"/>
                    <path d="M100 60 C130 80, 145 100, 150 130" stroke="#3a8f45" strokeWidth="4" fill="none" opacity="0.5"/>
                </g>
                <text x="400" y="170" fontSize="140" fontWeight="700" fill="var(--color)" fontFamily="Jost">4</text>
            </svg>
            <h2>Page not found!</h2>
            <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                Back to logging macros
            </Link>
        </motion.div>
    );
}