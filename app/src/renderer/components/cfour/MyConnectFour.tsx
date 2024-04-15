import { CFourUIPlayable } from "connect-four-board";
import { getData } from "../../UserData";
import { Chessboard } from "kokopu-react";

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
				"Moves cannot be played because the game is over.",
			);
		}
	}
	const set = getData("color_set")
	const sets = Chessboard.colorsets()

	const primary = sets[set].b
	const secondary = sets[set].w
	const red = sets[set].cr
	const yellow = sets[set].cy
	const green = sets[set].cg
	const blue = sets[set].cb

	return (
		<div>
			<CFourUIPlayable
				rows={6}
				columns={7}
				gameMoves={props.moves}
				playMove={playMove}
				move_index={props.boardIndex}
				player_a_color={red}
				player_b_color={yellow}
				background_color={primary}
				highlight_color="black"
				// UI only calls playMove when it's active
				// To create notifications, UI must always be active
				active={true}
			/>
		</div>
	);
}
