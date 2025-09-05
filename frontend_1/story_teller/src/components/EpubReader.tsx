import React, { useEffect, useRef } from "react";

const EpubReader: React.FC = () => {


    return (
        <main
            style={{
                flex: 1,
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                className="epub-reader-div"
                id="epub_root"
                style={{ width: "100%", height: "100%" }}
            >
                {/* The foliate view UI will mount inside #epub_root or this container */}
            </div>

            {/* Additional UI parts that Reader.js requires */}
            <div id="menu-button" style={{ display: "none" }}>
                <button>☰</button>
            </div>

            <div id="header-bar"></div>

            <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                accept=".epub"
            />
            <button id="file-button" style={{ display: "none" }}>
                Upload EPUB
            </button>

        </main>
    );
};

export default EpubReader;
