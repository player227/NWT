import React, { useState, useEffect } from "react";
import './Cell.css';
import bombSvg from '../images/Bomb.svg'

/*
    cell is used to show bomb and get clicked cell index
*/
function Cell(props) {
    const [showBomb, setShowBomb] = useState(props.isBomb);

    // Hide bomb after displayTime
    useEffect(() => {
        if (props.isBomb) {
            const timer = setTimeout(() => setShowBomb(false), props.displayTime * 1000);
            return () => clearTimeout(timer);
        }
    }, [props.isBomb, props.displayTime]);

    function handleClick() {
        if (showBomb) setShowBomb(false); // Hide bomb immediately
        props.clickedIndex(props.index, props.isBomb);
    }

    return (
        <div
            className="cell"
            onClick={handleClick}
            style={{ backgroundImage: showBomb ? `url(${bombSvg})` : "none" }}
        />
    );
}

export default Cell;