import { sendEmpty } from "../MoveSender";

export const PlayButton = (props: {
	sendEmpty?: () => void;
	active: boolean;
}) => {
	function sendEmptyMove() {
		if (props.active) {
			if (typeof props.sendEmpty === "undefined") {
				sendEmpty();
			} else {
				props.sendEmpty();
			}
		}
	}

	return (
		<div>
			<button
				className="classic-button"
				onClick={sendEmptyMove}
				disabled={!props.active}
			>
				PLAY!
			</button>
		</div>
	);
};
