import React, { useEffect, useState } from "react";
import "./PlayScoreUsername.css"

export default function PlayScoreUsername(props) {
    const { username: initialUsername, getUsername, usernameError } = props;
    const [username, setUsername] = useState(initialUsername);

    useEffect(() => {
        getUsername(username);
    }, [username, getUsername]);

    return (
        <div className="playScoreUsernameContainer" style={{ display: "flex" }}>
            <div
                id="playButton"
                onClick={() => {
                    props.playBtnClick(username);
                }}
            >
                {props.playBtnText}
            </div>
            <div id="score">Score: {props.score}</div>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                maxLength={10}
                value={username}
                onChange={(event) => {
                    setUsername(event.target.value);
                }}
                className={usernameError && username === "" ? "input-error" : ""}
            />
        </div>
    )
}