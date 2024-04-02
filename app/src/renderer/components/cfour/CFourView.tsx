import { MyConnectFour } from "./MyConnectFour";
import { Logs } from "../Logs";
import AIForm from "../AIForm";
import { useState } from "react";
import checkForWin from "./CFourWinChecker";
import CFourParser from "./CFourParser";
import { sendMove, sethandleMovePlayedByAi, startGame } from "../MoveSender";

export function CFourView() {
    const [boardIndex, setBoardIndex] = useState(-1);
    const [moves, setMoves] = useState([]);
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    function handleSubmit(
        filepath: string,
        _: string,
        runsetup: boolean
    ) {
        startGame(filepath, runsetup);
        setBoardIndex(0);
        setMoves([]);
        setHasBeenSubmitted(true);
    }

    function handleMovePlayedByAi(move: string) {
        if (!isGameOver) {
            moves.push(parseInt(move));
            setBoardIndex(boardIndex + 1);
        }
    }

    function handleMovePlayed(move: string) {
        sendMove(move);
        moves.push(move);
        setBoardIndex(boardIndex + 1);
    }

    sethandleMovePlayedByAi(handleMovePlayedByAi);

    function handlePrevMoveButton() {
        if (boardIndex > 0) {
            setBoardIndex(boardIndex - 1);
        }
    }

    function handleNextMoveButton() {
        if (boardIndex < moves.length - 1) {
            setBoardIndex(boardIndex + 1);
        }
    }

    const boardmatrix = CFourParser({ moves, boardIndex });
    const isGameOver = checkForWin(boardmatrix) || moves.length >= 42;

    return (
        <div>
            {hasBeenSubmitted && (
                <>
                    <MyConnectFour
                        moves={moves}
                        boardIndex={boardIndex}
                        onMovePlayed={handleMovePlayed}
                        active={!isGameOver}
                    />
                    <div>
                        <button onClick={handlePrevMoveButton}>{"<"}</button>
                        <button onClick={handleNextMoveButton}>{">"}</button>
                    </div>
                    <div>Turn {boardIndex}</div>
                </>
            )}
            {isGameOver && <div>GAME OVER</div>}
            <Logs />
            <AIForm
                handleSubmit={handleSubmit}
                showFen={false}
                formId="formC4"
            />
        </div>
    );
}
