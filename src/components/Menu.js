import React from "react";
import { Link } from "react-router-dom";
import './Menu.css'
import "./MenuBtn.css"

export default function Menu() {
    return (
        <nav className="menu">
            <Link to="/howto" id="howTo" className="button">How to play</Link>
            <Link to="/" id="play" className="button">Play</Link>
            <Link to="/scoreboard" id="scoreboard" className="button">Scoreboard</Link>
        </nav>
    )
}