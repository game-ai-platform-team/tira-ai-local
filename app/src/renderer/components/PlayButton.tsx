import { sendEmpty } from "../MoveSender";



export const PlayButton = (props: { sendEmpty?: () => void }) => {
	function sendEmptyMove() {
		if (typeof props.sendEmpty === "undefined") {
			sendEmpty();
		} else {
			props.sendEmpty();
		}
	}

	return (
		<div>
			<button className="classic-button" onClick={sendEmptyMove}>PLAY!</button>
		</div>
	);
};
