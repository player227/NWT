import React, { useState, useRef } from "react";
import "./Title.css";

function getRandomBoom() {
    return {
        id: `${Date.now()}-${Math.random()}`,
        top: Math.random() * 80 + 10,   // 10% to 90%
        left: Math.random() * 80 + 10,  // 10% to 90%
    };
}

export default function Title() {
    const [booms, setBooms] = useState([]);
    const intervalRef = useRef(null);

    function spawnBoom() {
        setBooms(prev => [...prev, getRandomBoom()]);
        setTimeout(() => {
            setBooms(prev => prev.slice(1));
        }, 1200);
    }

    function handleMouseEnter() {
        spawnBoom();
        intervalRef.current = setInterval(spawnBoom, 100);
    }

    function handleMouseLeave() {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    return (
        <>
            <div
                className="title"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span>Bombs</span>
            </div>
            {booms.map(boom => (
                <div
                    key={boom.id}
                    className="boom-explosion boom-small"
                    style={{
                        top: `${boom.top}%`,
                        left: `${boom.left}%`,
                    }}
                >
                    <span role="img" aria-label="explosion">💥</span>
                </div>
            ))}
        </>
    );
}