import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function ManagePresets({ setPage }) {

    const [presets, setPresets] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    const [newPreset, setNewPreset] = useState({
        name: "",
        calories: 0,
        protein: 0,
        fat: 0,
        addedSugar: 0,
        water: 0,
        icon: "meal",
    });

    const [renameId, setRenameId] = useState(null);
    const [renameValue, setRenameValue] = useState("");

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        setPage("/presets");
        document.title = "Manage Presets — CutLog";
        fetchPresets();
    }, []);

    const fetchPresets = async () => {
        const userId = JSON.parse(atob(token.split(".")[1])).id;

        const res = await axios.get(
            `http://localhost:3001/presets/byUser/${userId}`
        );

        setPresets(res.data);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            "http://localhost:3001/presets/create",
            newPreset,
            { headers: { accessToken: token } }
        );

        if (res.data.error) {
            alert(res.data.error);
        } else {
            setNewPreset({
                name: "",
                calories: 0,
                protein: 0,
                fat: 0,
                addedSugar: 0,
                water: 0,
                icon: "Meal",
            });

            setShowCreate(false);
            fetchPresets();
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(
            `http://localhost:3001/presets/${id}`,
            { headers: { accessToken: token } }
        );

        setPresets(presets.filter((p) => p.id !== id));
    };

    const handleRename = async (id) => {
        const res = await axios.put(
            "http://localhost:3001/presets/rename",
            { id, name: renameValue },
            { headers: { accessToken: token } }
        );

        if (!res.data.error) {
            setRenameId(null);
            fetchPresets();
        }
    };

    return (
        <motion.div
            className="manage-presets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>Manage Presets</h2>

            {/* Create Section */}

            {!showCreate && (
                <button onClick={() => setShowCreate(true)}>
                    + Create Preset
                </button>
            )}

            {showCreate && (
                <div>
                    <h3>New Preset</h3>

                    <form onSubmit={handleCreate}>

                        <input
                            placeholder="Name"
                            value={newPreset.name}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    name: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            type="number"
                            placeholder="Calories"
                            value={newPreset.calories}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    calories: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Protein"
                            value={newPreset.protein}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    protein: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Fat"
                            value={newPreset.fat}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    fat: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Added Sugar"
                            value={newPreset.addedSugar}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    addedSugar: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Water"
                            value={newPreset.water}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    water: e.target.value,
                                })
                            }
                        />

                        <select
                            value={newPreset.icon}
                            onChange={(e) =>
                                setNewPreset({
                                    ...newPreset,
                                    icon: e.target.value,
                                })
                            }
                        >
                            <option value="Meal">Meal</option>
                            <option value="Animal Protein">Animal Protein</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Complex Carb">Complex Carb</option>
                            <option value="Fat Source">Fat Source</option>
                            <option value="Custom">Custom</option>
                        </select>

                        <button type="submit">Save</button>

                        <button
                            type="button"
                            onClick={() => setShowCreate(false)}
                        >
                            Cancel
                        </button>

                    </form>
                </div>
            )}

            <hr />

            {/* Preset List */}

            <div>

                {presets.length === 0 && <p>No presets yet.</p>}

                {presets.map((preset) => (
                    <div key={preset.id}>

                        {renameId === preset.id ? (
                            <>
                                <input
                                    value={renameValue}
                                    onChange={(e) =>
                                        setRenameValue(e.target.value)
                                    }
                                />

                                <button
                                    onClick={() =>
                                        handleRename(preset.id)
                                    }
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() =>
                                        setRenameId(null)
                                    }
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{preset.name}</strong>

                                <div>
                                    {preset.calories} cal •{" "}
                                    {preset.protein}p •{" "}
                                    {preset.fat}f •{" "}
                                    {preset.addedSugar}s •{" "}
                                    {preset.water}w
                                </div>

                                <div>
                                    <small>
                                        Icon: {preset.icon}
                                    </small>
                                </div>

                                <button
                                    onClick={() => {
                                        setRenameId(preset.id);
                                        setRenameValue(preset.name);
                                    }}
                                >
                                    Rename
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(preset.id)
                                    }
                                >
                                    Delete
                                </button>
                            </>
                        )}

                        <hr />

                    </div>
                ))}

            </div>

        </motion.div>
    );
}