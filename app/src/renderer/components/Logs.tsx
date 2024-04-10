import React, { useState, useEffect, useRef } from "react";
import socket from "../MySocket";
import "../css/Logs.css"

export function Logs() {
	const [logs, setLogs] = useState([]);
	const textareaRef = useRef(null);

	function handleNewLogs(newLog) {
		const timestamp = new Date().toLocaleTimeString();
		setLogs((prevLogs) => [...prevLogs, `${timestamp}: ${newLog}`]);
	}

	useEffect(() => {
		socket.on("logs", (log) => {
			handleNewLogs(log);
		});

		if (textareaRef.current) {
			textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
		}

		return () => {
			socket.off("logs");
		};
	}, [logs]);

	return (
		<div id="log-box">
			<textarea
				ref={textareaRef}
				value={logs.join("\n")}
				readOnly
				style={{ width: "100%", height: "200px", overflowY: "scroll" }}
			/>
		</div>
	);
}
