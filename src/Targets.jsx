import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Targets({ page, setPage }) {

    const [form, setForm] = useState({ calories: "", protein: "", fat: "", addedSugar: "", water: "" });

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
            className='manage-presets'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <h2>Manage Presets</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Calories" name="calories" value={form.calories} onChange={handleChange} />
                <input type="number" placeholder="Protein" name="protein" value={form.protein} onChange={handleChange} />
                <input type="number" placeholder="Fat" name="fat" value={form.fat} onChange={handleChange} />
                <input type="number" placeholder="AddedSugar" name="addedSugar" value={form.addedSugar} onChange={handleChange} />
                <input type="number" placeholder="Water" name="water" value={form.water} onChange={handleChange} />
                <button type="submit">Save</button>
            </form>
        </motion.div>
    );
}