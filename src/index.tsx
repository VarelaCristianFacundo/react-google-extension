import React from 'react'

const index = () => {
    return (
        <>
            <div id="navbar-icon" title="Toggle Capture Mode" className="navbar-icon">
                <img src="icons/active-icon.png" alt="Capture Icon" />
            </div>
            <script defer src="capture.js"></script>
        </>
    )
}

export default index