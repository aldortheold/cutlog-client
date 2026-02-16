import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MetricCard from './MetricCard';
import Alert from './Alert';
import closeModal from './assets/closeModal';

const MAX_VALUES = { calories: 1800, protein: 180, fat: 60, addedSugar: 10, water: 3 };

const defaults = { calories: "", protein: "", fat: "", addedSugar: "", water: "" };

export default function Logger({ date, setPage, totals, setTotals, showTotals, setShowTotals }) {

    const alertRef = useRef(null);;

    const [form, setForm] = useState(defaults);

    const [alertType, setAlertType] = useState("error");
    const [alertMessage, setAlertMessage] = useState("Unexpected error occurred");
    const [alertMargin, setAlertMargin] = useState("300px");

    useEffect(() => setPage("/"));

    function handleChange(event) {
        const { name, value } = event.target;
        setForm(values => ({ ...values, [name]: value }));
    }

    function valid() {

        const calories = Number(form.calories) || 0;
        const protein = Number(form.protein) || 0;
        const fat = Number(form.fat) || 0;
        const addedSugar = Number(form.addedSugar) || 0;
        const water = Number(form.water) || 0;

        const values = [calories, protein, fat, addedSugar, water];

        if (
            values.some(v => v < 0) ||
            values.every(v => v === 0) ||
            (calories === 0 && (protein > 0 || fat > 0 || addedSugar > 0))
        ) return false;

        return true;
    }

    async function fetchTotals() {
        try {
            const res = await axios.get(
                "http://localhost:3001/logs/totals",
                { params: { date }, headers: { accessToken: localStorage.getItem("accessToken") } }
            );
            setTotals(res.data);
            setShowTotals(true);
        }
        catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("Failed to fetch totals");
            setAlertMargin("300px");
            alertRef.current.showModal();
            setTimeout(() => closeModal(alertRef), 2000);
        }
    }

    async function undo() {
        const res = await axios.delete(
            "http://localhost:3001/logs/undo",
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        if (res.data.error) {
            setAlertType("error");
            setAlertMessage(res.data.error);
            setAlertMargin("360px");
            alertRef.current.showModal();
            setTimeout(() => closeModal(alertRef), 2000);
        }
        else {
            setTotals(res.data);
            setAlertType("success");
            setAlertMessage("Last log removed");
            setAlertMargin("360px");
            alertRef.current.showModal();
            setTimeout(() => closeModal(alertRef), 2000);
        }
    }

    async function update(event) {
        event.preventDefault();
        try {
            if (!valid()) return;

            const log = {
                date: date,
                calories: Number(form.calories) || 0,
                protein: Number(form.protein) || 0,
                fat: Number(form.fat) || 0,
                addedSugar: Number(form.addedSugar) || 0,
                water: Number(form.water) || 0,
            };

            const res = await axios.post(
                "http://localhost:3001/logs/create", log,
                { headers: { accessToken: localStorage.getItem("accessToken") } }
            );

            setTotals(res.data.totals);
            setShowTotals(true);

            setForm({ calories: "", protein: "", fat: "", addedSugar: "", water: "" });
        }
        catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("Failed to log entry");
            setAlertMargin("300px");
            alertRef.current.showModal();
            setTimeout(() => closeModal(alertRef), 2000);
        }
    }

    return (
        <motion.div
            className='logger'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <section className="totals">
                <MetricCard value={totals.calories} max={MAX_VALUES.calories} label="Calories" color="#b77100" />
                <MetricCard value={totals.protein} max={MAX_VALUES.protein} label="Protein" color="#008f7c" />
                <MetricCard value={totals.fat} max={MAX_VALUES.fat} label="Fat" color="#507f00" />
                <MetricCard value={totals.addedSugar} max={MAX_VALUES.addedSugar} label="Added sugar" color="#8e0082" />
                <MetricCard value={totals.water} max={MAX_VALUES.water} label="Water" color="#023fa2" />
                <div className={`totals-overlay ${showTotals ? "hidden" : ""}`}>
                    <button className="show-totals" onClick={fetchTotals}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z"/></svg>
                        Load Totals
                    </button>
                </div>
            </section>
            <form className="log-form" onSubmit={update}>
                <div className="actions top">
                    <button type="button" onClick={undo}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M560-280H120v-400h720v120h-80v-40H200v240h360v80Zm-360-80v-240 240Zm440 104 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83-56-56Z"/></svg>
                        Remove Last
                    </button>
                    <button type="button" onClick={() => setForm(defaults)} disabled={Object.values(form).every(v => v === "")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/></svg>
                        Clear Form
                    </button>
                </div>
                <h2>Update Totals</h2>
                <input name="calories" type="number" placeholder="Calories" value={form.calories} onChange={handleChange} />
                <input name="protein" type="number" placeholder="Protein (g)" value={form.protein} onChange={handleChange} />
                <input name="fat" type="number" placeholder="Fat (g)" value={form.fat} onChange={handleChange} />
                <input name="addedSugar" type="number" placeholder="Added sugar (g)" value={form.addedSugar} onChange={handleChange} />
                <input name="water" type="number" step="0.01" placeholder="Water (L)" value={form.water} onChange={handleChange} />
                <div className="actions">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M130-189 81-546q-5-32 15.5-58t52.5-31l61 435 283-40h267q-8 21-24.5 35.5T695-187l-477 66q-33 5-58-15t-30-53Zm190-127q-33 0-56.5-23.5T240-396v-364q0-33 23.5-56.5T320-840h480q33 0 56.5 23.5T880-760v364q0 33-23.5 56.5T800-316H320Zm0-80h480v-364H320v364Zm0 0v-364 364ZM210-200Zm190-400h320v-80H400v80Zm0 120h200v-80H400v80Z"/></svg>
                        Presets
                    </button>
                    <button type="submit" disabled={!valid()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        Log Macros
                    </button>
                </div>
            </form>
            <Alert ref={alertRef} type={alertType} message={alertMessage} margin={alertMargin} />
        </motion.div>
    );
}