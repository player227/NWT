import React, { useState, useRef, useEffect } from "react";
import './Cell.css';
import bombSvg from '../images/Bomb.svg'

/*
    cell is used to show bomb and get clicked cell index
*/
function Cell(props) {
    const img = useRef(
        (props.isBomb) ? `url(${bombSvg})` : `url(none)`);

    const [forceRender, setForceRender] = useState(false);
    const displayTimer = useRef(props.displayTime);
    const isBomb = useRef(props.isBomb);
    const showTimeout = useRef(0);

    //if bomb is clicked it is no longer a bomb
    function clickedMe() {
        img.current = null;
        isBomb.current = false;
        clearTimeout(showTimeout.current);
        setForceRender(f => !f);
    }

    //when bomb is created it needs to show itself for some time
    useEffect(() => {
        if (isBomb.current) {
            showTimeout.current = setTimeout(() => {
                img.current = null;
                setForceRender(f => !f);
            }, displayTimer.current * 1000);
        }
    }, [])

    return (
        <div className="cell" onClick={() => {
            props.clickedIndex(props.index, isBomb.current);
            clickedMe();
        }} style={{ backgroundImage: img.current }}></div>
    )
}

export default Cell;