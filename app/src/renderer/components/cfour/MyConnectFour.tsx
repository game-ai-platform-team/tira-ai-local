import { CFourUIPlayable } from "connect-four-board";
import { PlayButton } from "../PlayButton";

export function MyConnectFour(props: {
	moves: number[];
	boardIndex: number;
	onMovePlayed;
	active: boolean;
}) {
	function playMove(move: number) {
		props.onMovePlayed(move);
	}

	return (
		<div>
			<CFourUIPlayable
				rows={6}
				columns={7}
				gameMoves={props.moves}
				playMove={playMove}
				move_index={props.boardIndex}
				active={props.active}
			/>
		</div>
	);
}
