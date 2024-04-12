import { Chessboard } from "kokopu-react";
import { MoveDescriptor, Position } from "kokopu";
import { sendMove, sethandleMovePlayedByAi } from "../../MoveSender";

export function MyChessboard(props: {
	pos: Position;
	addPosition: (position, move) => void;
	active: boolean;
	notification?(header, body, bg): void;
	arrow: string;
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
			if (validateMove(move)) {
				const copy = new Position(props.pos);
				const move_desc = copy.uci(move);

				copy.play(move_desc);
				props.addPosition(copy, move_desc);
			} else {
				props.notification(
					"Move was not played!",
					`${move} is not a valid uci move to play in position: ${props.pos.fen()}`,
					"Danger",
				);
			}
		} else {
			props.notification(
				"Move was not played!",
				"Board is not active.",
				"danger",
			);
		}
	}

	function validateMove(move: string) {
		const copy = new Position(props.pos);
		let move_desc: MoveDescriptor;
		try {
			move_desc = copy.uci(move);
		} catch (error) {
			return false;
		}
		const move_san = copy.notation(move_desc);
		const success = copy.play(move_san);
		return success;
	}

	sethandleMovePlayedByAi(handleMovePlayedByAi);

	return (
		<div>
			<Chessboard
				interactionMode={"playMoves"}
				onMovePlayed={(move) => handleMovePlayed(move)}
				position={props.pos}
				arrowMarkers={props.arrow}
			/>
		</div>
	);
}
