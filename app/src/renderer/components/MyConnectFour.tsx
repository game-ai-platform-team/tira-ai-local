import { CFourUIPlayable } from "connect-four-board";

export function MyConnectFour(props) {
    const gameMoves = [];

    function playMove(move) {
        gameMoves.push(move);
    }

    return (
        <div>
            <CFourUIPlayable
                rows={6}
                columns={7}
                gameMoves={gameMoves}
                playMove={playMove}
            />
        </div>
    );
}
