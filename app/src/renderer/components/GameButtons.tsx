import { PlayButton } from "./PlayButton";

export function GameButtons(props: {
	handlePrevMoveButton;
	handleNextMoveButton;
	autoSendMove;
	handleToggle;
	active: boolean;
}) {
	return (
		<>
			<div className="game-buttons">
				<button
					className="classic-button"
					onClick={props.handlePrevMoveButton}
					data-testid="prev-move-button"
				>
					{"<"}
				</button>

				<PlayButton active={props.active}/>
				<button
					className="classic-button"
					onClick={props.handleNextMoveButton}
					data-testid="next-move-button"
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
