import { CFourUIPlayable } from "connect-four-board";

export function MyConnectFour(props: {
	moves: number[];
	boardIndex: number;
	onMovePlayed(move: string);
	active: boolean;
	notification?(headear, body, bg?): void;
}) {
	function playMove(move: number) {
		if (props.active) {
			props.onMovePlayed(move.toString());
		} else if (props.boardIndex === 0) {
			props.notification(
				"AI Process Inactive",
				"The AI process must be active to interact with the game board. Input the path and press SUBMIT.",
			);
		} else {
			props.notification(
				"Game Over!",
				"Moves cannot be played because the game is over."
			)
		}
	}

	return (
		<div>
			<CFourUIPlayable
				rows={6}
				columns={7}
				gameMoves={props.moves}
				playMove={playMove}
				move_index={props.boardIndex}
				// UI only calls playMove when it's active
				// To create notifications, UI must always be active
				active={true}
			/>
		</div>
	);
}
