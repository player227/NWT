import React, { useRef, useState } from "react"
import Board from "./Board"
import PlayScoreUsername from "./PlayScoreUsername"
import { sendScore } from "./DBcomms"

function GameContainer() {
    const score = useRef(0);
    const [level, setLevel] = useState(1);
    const [playBtnOrBoard, setPlayBtnOrBoard] = useState(true); // playBtn - true : board - false
    const username = useRef("");
    const [playButtonText, setPlayButtonText] = useState("PLAY");

    //update username from playscoreusername
    function getUsername(_username) {
        username.current = _username
    }

    //play button clicked from playscoreusername
    function playBtnClick(_username) {
        console.log("Username: " + _username);
        if (_username === "" || _username === null) {
            alert("Enter username!");
        }
        else {
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
        //show play button, score and username
        setPlayBtnOrBoard(true);
        //increase score
        score.current += _score;
        //reset level
        setLevel(1);
        //send score to database
        sendScore(username.current, score.current);
        //set play button text
        setPlayButtonText("GAME OVER");
        setTimeout(() => {
            setPlayButtonText("PLAY AGAIN");
        }, 3000);
    }

    return (
        <div className="content">
            {playBtnOrBoard ?
                <PlayScoreUsername playBtnText={playButtonText} score={score.current} username={username.current} getUsername={getUsername} playBtnClick={playBtnClick} />
                : <Board level={level} win={win} gameOver={gameOver} />}
        </div>
    )
}

export default GameContainer;