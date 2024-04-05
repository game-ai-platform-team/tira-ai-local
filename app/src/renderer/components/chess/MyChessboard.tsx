import { Chessboard } from "kokopu-react";
import { Position } from "kokopu";
import { sendMove, sethandleMovePlayedByAi } from "../../MoveSender";
import { PlayButton } from "../PlayButton";

export function MyChessboard(props: {
	pos: Position;
	addPosition: (position, move) => void;
	active: boolean;
}) {
	function handleMovePlayed(move: string) {
		if (props.active) {
			const copy = new Position(props.pos);
			const move_desc = copy.notation(move);

			sendMove(copy.uci(move_desc));
			copy.play(move_desc);
			props.addPosition(copy, move_desc);
		}
	}

	function handleMovePlayedByAi(move: string) {
		if (props.active) {
			const copy = new Position(props.pos);
			const move_desc = copy.uci(move);

			copy.play(move_desc);
			props.addPosition(copy, move_desc);
		}
	}

	sethandleMovePlayedByAi(handleMovePlayedByAi);

	return (
		<div>
			<Chessboard
				interactionMode={"playMoves"}
				onMovePlayed={(move) => handleMovePlayed(move)}
				position={props.pos}
			/>
			<PlayButton />
		</div>
	);
}
