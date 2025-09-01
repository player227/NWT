import React, { useEffect, useState } from 'react'
import { getScores } from './DBcomms';
import './Scoreboard.css'

const scoresMap = {
    0: " first",
    1: " second",
    2: " third"
}

function scoreClasses(key) {
    return ("score" + ((key < 3) ? scoresMap[key] : ""));
}

export default function Scoreboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const scores = await getScores();
                const elements = scores.data.map((item) => item.Name + " " + item.Score);
                setData(elements);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])

    return (
        <div className='content'>
            <ul className='scoreList'>
                {data.map((value, key) => (
                    <li className={scoreClasses(key)} key={key}>
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    )
}
