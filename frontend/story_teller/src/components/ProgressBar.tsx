import React from "react";
import { Reader } from "../../../../foliate-js/reader.js";

const ProgressBar: React.FC = () => {
    return (
        <div id="nav-bar">
            <button id="left-button">←</button>
            <input id="progress-slider" type="range" min="0" max="1" step="any" list="tick-marks" />
            <datalist id="tick-marks"></datalist>
            <button id="right-button">→</button>
        </div>

    );
};

export default ProgressBar;
