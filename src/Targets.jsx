import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Targets({ page, setPage }) {

    const [form, setForm] = useState({ calories: "0", protein: "0", fat: "0", addedSugar: "0", water: "0" });

    useEffect(() => {
        setPage("/targets");
        axios.get(
            "http://localhost:3001/targets/fetch",
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(res => {
            if (res.data) setForm(res.data);
        });
    }, [page]);

    async function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post(
            "http://localhost:3001/targets/update", form,
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
    };

    return (
        <motion.div
            className='targets'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Edit Targets & Limits</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="calories">Calories</label>
                <input type="number" placeholder="Calories" id="calories" name="calories" value={form.calories} onChange={handleChange} />
                <label htmlFor="protein">Protein (g)</label>
                <input type="number" placeholder="Protein" id="protein" name="protein" value={form.protein} onChange={handleChange} />
                <label htmlFor="fat">Fat (g)</label>
                <input type="number" placeholder="Fat" id="fat" name="fat" value={form.fat} onChange={handleChange} />
                <label htmlFor="addedSugar">Added sugar (g)</label>
                <input type="number" placeholder="AddedSugar" id="addedSugar" name="addedSugar" value={form.addedSugar} onChange={handleChange} />
                <label htmlFor="water">Water (L)</label>
                <input type="number" placeholder="Water" id="water" name="water" value={form.water} onChange={handleChange} />
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                    Save
                </button>
            </form>
        </motion.div>
    );
}