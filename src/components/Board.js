import React, { useRef } from "react";
import Cell from "./Cell"
import './Board.css'

//shuffle array
function shuffle(array) {
    let tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

//generate indexes for all bombs, number of bombs follows rule: (level < 14) ? level : 13
function generateBombIndexes(level) {
    let arr = [...Array(25).keys()];
    arr = shuffle(arr);
    const bombNum = (level < 14) ? level : 13;
    arr.splice(bombNum, 25 - bombNum);
    return arr;
}

/*
    board is 5x5
    board renders when:
        level increases
        game is started
        game is over
*/
function Board(props) {
    // cellsIndexes = [...Array(25).keys()]
    const bombCellsIndexes = useRef(generateBombIndexes(props.level));
    const score = useRef(0);
    const displayTime = useRef((props.level < 14) ? 3 : 3 / Math.pow(2, (props.level - 13) / 5));

    // get clicked cell index from child component
    function clickedIndex(index, isBomb) {
        // if clicked index is bomb
        if (isBomb) {
            // increase score
            score.current = score.current + 20;
            // remove bomb index from array bombCellsIndexes
            bombCellsIndexes.current.splice(bombCellsIndexes.current.indexOf(index), 1);
            // if there are no more bombs level is cleared
            if (!bombCellsIndexes.current.length) {
                props.win(score.current);
            }
            return false;
        }
        else {// game over
            props.gameOver(score.current);
        }
    }

    return (
        <div className="gameboard" >
            {
                [...Array(25).keys()].map((item) => {
                    return <Cell key={item} index={item} isBomb={(bombCellsIndexes.current.includes(item))} clickedIndex={clickedIndex} displayTime={displayTime.current} />
                })
            }
        </div >
    );
}

export default Board;