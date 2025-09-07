import React, { useRef, useState } from "react"
import Board from "./Board"
import PlayScoreUsername from "./PlayScoreUsername"
import { sendScore } from "./DBcomms"
import { useNavigate } from "react-router-dom" // <-- Add this

function GameContainer() {
    const score = useRef(0);
    const [level, setLevel] = useState(1);
    const [playBtnOrBoard, setPlayBtnOrBoard] = useState(true);
    const username = useRef("");
    const [playButtonText, setPlayButtonText] = useState("PLAY");
    const [usernameError, setUsernameError] = useState(false);
    const navigate = useNavigate(); // <-- Add this

    //update username from playscoreusername
    function getUsername(_username) {
        username.current = _username
    }

    //play button clicked from playscoreusername
    function playBtnClick(_username) {
        console.log("ALDO Play button clicked with username:", _username);
        if (_username === "" || _username === null) {
            setUsernameError(true);
            setPlayBtnOrBoard(true);
        }
        else {
            setUsernameError(false);
            setPlayBtnOrBoard(false);
        }
    }

    //save score, increase level after regular level ending (no context switch)
    function win(_score) {
        //increase score
        score.current += _score;
        //increase level
        setLevel(level + 1);
        //play button text
        setPlayButtonText("PLAY NEXT");
        //show play button, score and username
        setPlayBtnOrBoard(true);
    }

    //game over - reset level by switching gameOver value
    function gameOver(_score) {
        setPlayBtnOrBoard(true);
        score.current += _score;
        setLevel(1);
        sendScore(username.current, score.current);
        setPlayButtonText("GAME OVER");
        setTimeout(() => {
            navigate("/leaderboard");
        }, 1000);
    }

    return (
        <div className="content">
            {playBtnOrBoard ?
                <PlayScoreUsername
                    playBtnText={playButtonText}
                    score={score.current}
                    username={username.current}
                    getUsername={getUsername}
                    playBtnClick={playBtnClick}
                    usernameError={usernameError}
                />
                : <Board level={level} win={win} gameOver={gameOver} />}
        </div>
    )
}

export default GameContainer;