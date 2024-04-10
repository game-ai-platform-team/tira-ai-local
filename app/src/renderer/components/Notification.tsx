import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface NotificationProps {
	show: boolean;
	onClose: () => void;
	headerText?: string;
	bodyText?: string;
	bg?: string;
}

export function Notification({
	show,
	onClose,
	headerText = "",
	bodyText = "",
	bg = "",
}: NotificationProps) {
	return (
		<ToastContainer position={"top-center"}>
			<Toast show={show} onClose={onClose} bg={bg} autohide={true}>
				{headerText && (
					<Toast.Header>
						<strong className="me-auto" id="notification">
							{headerText}
						</strong>
					</Toast.Header>
				)}
				{bodyText && (
					<Toast.Body id="notification">{bodyText}</Toast.Body>
				)}
			</Toast>
		</ToastContainer>
	);
}
