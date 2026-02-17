import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Alert from './Alert';
import closeModal from './assets/closeModal';

export default function Targets({ page, setPage }) {

    const navigate = useNavigate();

    const alertRef = useRef(null);

    const [form, setForm] = useState({ calories: "0", protein: "0", fat: "0", addedSugar: "0", water: "0" });
    const [originalForm, setOriginalForm] = useState({ calories: "0", protein: "0", fat: "0", addedSugar: "0", water: "0" });

    const [alertType, setAlertType] = useState("error");
    const [alertMessage, setAlertMessage] = useState("Unexpected error occurred");

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

    const original = 
        form.calories == originalForm.calories &&
        form.protein == originalForm.protein &&
        form.fat == originalForm.fat &&
        form.addedSugar == originalForm.addedSugar &&
        form.water == originalForm.water;

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
        try {
            const res = await axios.post(
                "http://localhost:3001/targets/update", form,
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            );
            if (res.data.error) {
                setAlertType("error");
                setAlertMessage(res.data.error);
                alertRef.current.showModal();
                setTimeout(() => closeModal(alertRef), 2000);
            }
            else {
                setForm({ ...res.data });
                setOriginalForm({ ...res.data });
                localStorage.removeItem("edit-targets");
                setAlertType("success");
                setAlertMessage("Targets have been saved");
                alertRef.current.showModal();
                setTimeout(() => closeModal(alertRef), 2000);
            }
        }
        catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("Failed to save targets");
            alertRef.current.showModal();
            setTimeout(() => closeModal(alertRef), 2000);
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
            <h2>Edit Targets & Limits*</h2>
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
                    {localStorage.getItem("edit-targets") ?
                    <button type="button" onClick={skip}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                        Skip
                    </button> :
                    <button type="button" onClick={() => setForm(originalForm)}  disabled={original}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>
                        Discard
                    </button>}
                    <button type="submit" disabled={original}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                        Save
                    </button>
                </div>
            </form>
            <p className="footnote"><span>* </span>Default targets are based on <a href="https://blueprint.bryanjohnson.com/blogs/news/bryan-johnsons-protocol">Bryan Johnson’s Blueprint protocol</a>. Use them as a baseline and tailor them to your personal nutrition goals. <Link onClick={() => setForm({ calories: 2250, protein: 130, fat: 100, addedSugar: 0, water: 2 })}>Click here to reset to defaults</Link>.</p>
            <Alert ref={alertRef} type={alertType} message={alertMessage} margin="10px" />
        </motion.div>
    );
}