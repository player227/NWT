import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './Menu.css'
import "./MenuBtn.css"

export default function Menu() {
    const [open, setOpen] = useState(false);

    // Helper to close menu after navigation
    const handleNav = () => setOpen(false);

    return (
        <>
            <nav className={`menu${open ? " open" : ""}`}>
                {/* Bubble for mobile */}
                <button
                    className="menu-bubble"
                    aria-label={open ? "Close menu" : "Open menu"}
                    onClick={() => setOpen(o => !o)}
                >
                    {open ? "✕" : "☰"}
                </button>
                <div className={`menu-links${open ? " show" : ""}`}>
                    <NavLink
                        to="/howto"
                        id="howTo"
                        className={({ isActive }) => isActive ? "button active" : "button"}
                        onClick={handleNav}
                    >
                        How to play
                    </NavLink>
                    <NavLink
                        to="/"
                        id="play"
                        className={({ isActive }) => isActive ? "button active" : "button"}
                        end
                        onClick={handleNav}
                    >
                        Play
                    </NavLink>
                    <NavLink
                        to="/scoreboard"
                        id="scoreboard"
                        className={({ isActive }) => isActive ? "button active" : "button"}
                        onClick={handleNav}
                    >
                        Scoreboard
                    </NavLink>
                </div>
            </nav>
        </>
    )
}