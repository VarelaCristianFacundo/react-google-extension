import React, { useState } from "react";

function App() {
    const [isCaptureMode, setIsCaptureMode] = useState(false);

    const toggleCaptureMode = () => {
        // message to background script to activate capture mode
        const newCaptureMode = !isCaptureMode;
        chrome.runtime.sendMessage({ captureMode: newCaptureMode });
        setIsCaptureMode(newCaptureMode);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Inspector Mode</h1>
            <button
                onClick={toggleCaptureMode}
                style={{ padding: "10px 20px", cursor: "pointer" }}
            >
                {isCaptureMode ? "Exit Capture Mode" : "Enter Capture Mode"}
            </button>
        </div>
    );
}

export default App;
