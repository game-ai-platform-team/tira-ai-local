import { setReturnMove } from "../MoveSender";
import { PlayButton } from "./PlayButton";

export function GameButtons(props: {
	handlePrevMoveButton;
	handleNextMoveButton;
	autoSendMove;
	handleToggle;
	playActive: boolean;
	prevActive: boolean;
	nextActive: boolean;
	hasBeenSumbitted: boolean;
	gameOver: boolean;
}) {
	setReturnMove(!props.autoSendMove);
	// Set value to checkbox value (if changed elsewhere)
	return (
		<>
			<div className="game-buttons">
				<button
					className="classic-button"
					onClick={props.handlePrevMoveButton}
					data-testid="prev-move-button"
					disabled={!(props.prevActive && props.hasBeenSumbitted)}
				>
					{"<"}
				</button>

				<PlayButton
					active={
						props.playActive &&
						props.hasBeenSumbitted &&
						!props.gameOver
					}
				/>
				<button
					className="classic-button"
					onClick={props.handleNextMoveButton}
					data-testid="next-move-button"
					disabled={
						!(
							props.nextActive &&
							props.hasBeenSumbitted &&
							!props.gameOver
						)
					}
				>
					{">"}
				</button>
			</div>
			<div>
				<label htmlFor="auto-send-toggle">Send PLAY after move</label>
				<input
					type="checkbox"
					id="auto-send-toggle"
					checked={!props.autoSendMove}
					onChange={props.handleToggle}
				/>
			</div>
		</>
	);
}
