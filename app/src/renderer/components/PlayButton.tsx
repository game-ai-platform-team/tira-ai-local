import React, { useState } from "react";
import { sendEmpty, setReturnMove } from "../MoveSender";

export const PlayButton = (props: { sendEmpty?: () => void }) => {
  const [autoSendMove, setAutoSendMove] = useState(true);
  function sendEmptyMove() {
    console.log(props.sendEmpty);
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
			<br />
			<label htmlFor="auto-send-toggle">Send PLAY after move</label>
			<input
				type="checkbox"
				id="auto-send-toggle"
				checked={!autoSendMove}
				onChange={handleToggle}
			/>
		</div>
	);
};
