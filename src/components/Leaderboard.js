import React, { useEffect, useState } from 'react'
import { getScores } from './DBcomms';
import './Leaderboard.css'

const scoresMap = {
    0: " first",
    1: " second",
    2: " third"
}

function scoreClasses(key) {
    return ("score" + ((key < 3) ? scoresMap[key] : ""));
}

export default function Leaderboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const scores = await getScores();
                setData(scores.data);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])

    return (
        <div className='content'>
            <ul className='scoreList'>
                {data.map((item, key) => (
                    <li className={scoreClasses(key)} key={key}>
                        <span className="score-name">{item.Name}</span>
                        <span className="score-value">{item.Score}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
