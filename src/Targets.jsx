import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Targets({ page, setPage }) {

    const navigate = useNavigate();

    const [form, setForm] = useState({ calories: "0", protein: "0", fat: "0", addedSugar: "0", water: "0" });
    const [originalForm, setOriginalForm] = useState({ calories: "0", protein: "0", fat: "0", addedSugar: "0", water: "0" });

    useEffect(() => {
        setPage("/targets");
        axios.get(
            "http://localhost:3001/targets/fetch",
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(res => {
            if (res.data) {
                setForm({ ...res.data });
                setOriginalForm({ ...res.data });
            }
        });
    }, [page]);

    function skip() {
        localStorage.removeItem("edit-targets");
        navigate("/");
    }

    async function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post(
            "http://localhost:3001/targets/update", form,
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        if (res.data.error) alert("Failed to save totals");
        else {
            setForm({ ...res.data });
            setOriginalForm({ ...res.data });
            localStorage.removeItem("edit-targets");
        }
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
                <div className="actions">
                    {localStorage.getItem("edit-targets") && <button type="button" onClick={skip}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                        Skip
                    </button>}
                    <button type="submit" disabled={
                        form.calories == originalForm.calories &&
                        form.protein == originalForm.protein &&
                        form.fat == originalForm.fat &&
                        form.addedSugar == originalForm.addedSugar &&
                        form.water == originalForm.water
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                        Save
                    </button>
                </div>
            </form>
            <p><span>* </span>Default targets are based on <a href="https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol">Bryan Johnson’s Blueprint protocol</a>. Use them as a baseline and tailor them to your personal nutrition goals.</p>
        </motion.div>
    );
}