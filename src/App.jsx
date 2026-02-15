import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './assets/AuthContext';
import axios from 'axios';
import Welcome from './Welcome';
import Logger from './Logger';
import Targets from './Targets';
import ManagePresets from './ManagePresets';
import Stats from './Stats';
import ExportData from './ExportData';
import About from './About';
import LogIn from './LogIn';
import SignUp from './SignUp';
import NotFound from './NotFound';

const today = new Date().toLocaleDateString("en-CA");

const activeStyles = {
    backgroundColor: "var(--color)",
    color: "var(--button-bg)"
}

export default function App() {

    const [authState, setAuthState] = useState({ username: "", id: 0, status: false });

    const [totals, setTotals] = useState({ calories: 0, protein: 0, fat: 0, addedSugar: 0, water: 0 });

    const [date, setDate] = useState(today);
    const [page, setPage] = useState(window.location.pathname);

    const [openMenu, setOpenMenu] = useState(false);
    const [showTotals, setShowTotals] = useState(false);

    useEffect(() => {
        axios.get(
            "http://localhost:3001/users/auth",
            { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then(response => {
            setAuthState(response.data.error ?
                { ...authState, status: false }
                : { username: response.data.username, id: response.data.id, status: true }
            );
        });
    }, []);

    function logout() {
        setOpenMenu(false);
        setAuthState({ username: "", id: 0, status: false });
        localStorage.removeItem("accessToken");
    }

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <BrowserRouter>
                <Routes>
                    {authState.status ?
                    <>
                        <Route index element={<Logger date={date} setPage={setPage} totals={totals} setTotals={setTotals} showTotals={showTotals} setShowTotals={setShowTotals} />} />
                        <Route path="/targets" element={<Targets setPage={setPage} />} />
                        <Route path="/presets" element={<ManagePresets setPage={setPage} />} />
                        <Route path="/stats" element={<Stats setPage={setPage} />} />
                        <Route path="/export" element={<ExportData setPage={setPage} />} />
                    </> :
                    <>
                        <Route index element={<Welcome />} />
                        <Route path="/login" element={<LogIn setPage={setPage} />} />
                        <Route path="/signup" element={<SignUp setPage={setPage} />} />
                    </>}
                    <Route path="/about" element={<About setPage={setPage} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {authState.status &&
                <header>
                    <button className={`hamburger ${openMenu ? "active" : ""}`} onClick={() => setOpenMenu(!openMenu)}>
                        <span /><span /><span />
                    </button>
                    <div className={`menu-panel ${openMenu ? "show" : ""}`}>
                        <Link to="/" onClick={() => setOpenMenu(false)} style={ page == "/" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">y<path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                            Log Macros
                        </Link>
                        <Link to="/targets" onClick={() => setOpenMenu(false)} style={ page == "/targets" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM707-253q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Zm-397-57q-70-70-70-170t70-170q70-70 170-70t170 70q70 70 70 170t-70 170q-70 70-170 70t-170-70Zm283-57q47-47 47-113t-47-113q-47-47-113-47t-113 47q-47 47-47 113t47 113q47 47 113 47t113-47Zm-169.5-56.5Q400-447 400-480t23.5-56.5Q447-560 480-560t56.5 23.5Q560-513 560-480t-23.5 56.5Q513-400 480-400t-56.5-23.5Z"/></svg>
                            Targets & Limits
                        </Link>
                        <Link to="/presets" onClick={() => setOpenMenu(false)} style={ page == "/presets" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-200v-160 4-4 160Zm0 80q-33 0-56.5-23.5T120-200v-160q0-33 23.5-56.5T200-440h560q33 0 56.5 23.5T840-360H200v160h400v80H200Zm0-400q-33 0-56.5-23.5T120-600v-160q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v160q0 33-23.5 56.5T760-520H200Zm0-80h560v-160H200v160Zm0 0v-160 160ZM760-40v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg>
                            Manage Presets
                        </Link>
                        <Link to="/stats" onClick={() => setOpenMenu(false)} style={ page == "/stats" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M291.5-411.5Q280-423 280-440t11.5-28.5Q303-480 320-480t28.5 11.5Q360-457 360-440t-11.5 28.5Q337-400 320-400t-28.5-11.5Zm160 0Q440-423 440-440t11.5-28.5Q463-480 480-480t28.5 11.5Q520-457 520-440t-11.5 28.5Q497-400 480-400t-28.5-11.5Zm160 0Q600-423 600-440t11.5-28.5Q623-480 640-480t28.5 11.5Q680-457 680-440t-11.5 28.5Q657-400 640-400t-28.5-11.5ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                            Weekly Stats
                        </Link>
                        <Link to="/export" onClick={() => setOpenMenu(false)} style={ page == "/export" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M467-120q-73-1-136-14t-110-34.5q-47-21.5-74-50T120-280q0 33 27 61.5t74 50Q268-147 331-134t136 14Zm-15-200q-38-2-73.5-6.5t-67.5-12q-32-7.5-60-17.5t-51-23q23 13 51 23t60 17.5q32 7.5 67.5 12T452-320Zm28-279q89 0 179-26.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 27 101.5 53.5T480-599Zm220 479h40v-164l72 72 28-28-120-120-120 120 28 28 72-72v164ZM578.5-98.5Q520-157 520-240t58.5-141.5Q637-440 720-440t141.5 58.5Q920-323 920-240T861.5-98.5Q803-40 720-40T578.5-98.5ZM443-201q3 22 9 42t15 39q-73-1-136-14t-110-34.5q-47-21.5-74-50T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v187q-19-9-39-15t-41-9v-62q-52 29-124 44t-156 15q-85 0-157-15t-123-44v101q51 47 130.5 62.5T480-400h11q-13 18-22.5 38T452-320q-76-4-141-18.5T200-379v99q7 13 30 26.5t56 24q33 10.5 73.5 18T443-201Z"/></svg>
                            Export Data
                        </Link>
                        <Link to="/about" onClick={() => setOpenMenu(false)} style={ page == "/about" ? activeStyles : {} }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            About
                        </Link>
                        <div className="auth-actions">
                            <Link to="/" onClick={() => setOpenMenu(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm379-235q41-41 41-99t-41-99q-41-41-99-41t-99 41q-41 41-41 99t41 99q41 41 99 41t99-41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm168.5-337.5Q420-555 420-580t17.5-42.5Q455-640 480-640t42.5 17.5Q540-605 540-580t-17.5 42.5Q505-520 480-520t-42.5-17.5ZM480-503Z"/></svg>
                                {authState.username}
                            </Link>
                            <Link to="/" onClick={logout}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                                Sign Out
                            </Link>
                        </div>
                    </div>
                    <div className="exit-menu-panel" onClick={() => setOpenMenu(false)} style={{ display: openMenu ? "block" : "none" }} />
                    <h1><Link to="/">CutLog</Link></h1>
                    {page == "/" && <input type="date" id="date" value={date} onChange={event => {
                        setShowTotals(false);
                        setDate(event.target.value);
                    }}/>}
                </header>}
            </BrowserRouter>
        </AuthContext.Provider>
    );
}