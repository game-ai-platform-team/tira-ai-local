import React, { useState, useEffect } from 'react';
import socket from "../MySocket";

export function Logs() {
    const [logs, setLogs] = useState([]);

    function handleNewLogs(newLog) {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prevLogs => [...prevLogs, `${timestamp}: ${newLog}`]);
    }

    useEffect(() => {
        socket.on("logs", (log) => {
            handleNewLogs(log);
        });
        return () => {
            socket.off("logs");
        };
    }, []);

    return (
        <div>
            <textarea
                value={logs.join('\n')}
                readOnly
                style={{ width: '100%', height: '200px', overflowY: 'scroll' }}
            />
        </div>
    );
}
