import React, { useState } from "react";
import { sendEmpty, setReturnMove } from "../MoveSender";

export const PlayButton = (props: { sendEmpty?: () => void }) => {
	const [autoSendMove, setAutoSendMove] = useState(false);
	function sendEmptyMove() {
		if (typeof props.sendEmpty === "undefined") {
			sendEmpty();
		} else {
			props.sendEmpty();
		}
	}

	function handleToggle() {
		setAutoSendMove(!autoSendMove);
		setReturnMove(autoSendMove);
	}

	return (
		<div>
			<button onClick={sendEmptyMove}>PLAY!</button>
		</div>
	);
};
