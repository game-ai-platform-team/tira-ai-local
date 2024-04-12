import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface NotificationProps {
	show: boolean;
	onClose: () => void;
	headerText?: string;
	bodyText?: string;
	bg?: string;
	consoleLog?: boolean;
}

export function Notification({
	show,
	onClose,
	headerText = "",
	bodyText = "",
	bg = "",
	consoleLog = true,
}: NotificationProps) {
	if (consoleLog) {
		if (bg.toLowerCase() == "danger") {
			console.error(`${headerText}\n${bodyText}`)
		} else {
			console.log(`${headerText}\n${bodyText}`);
		}
	}
	return (
		<ToastContainer position={"top-center"}>
			<Toast
				show={show}
				onClose={onClose}
				bg={bg}
				autohide={true}
				delay={10000}
			>
				{headerText && (
					<Toast.Header>
						<strong className="me-auto" id="notification">
							{headerText}
						</strong>
					</Toast.Header>
				)}
				{bodyText && (
					<Toast.Body id="notification">
						<div style={{ maxHeight: "200px", overflowY: "auto" }}>
							{bodyText}
						</div>
					</Toast.Body>
				)}
			</Toast>
		</ToastContainer>
	);
}
