import { useEffect } from "react";
import { Reader } from "../../../../foliate-js/reader.js";
import { useLocation } from "react-router";

function ReaderComponent() {
    const location = useLocation();
    const { epubUrl } = location.state || {};

    useEffect(() => {
        if (!epubUrl) {
            alert("No EPUB file provided.");
            return;
        }
        const open = async (file) => {
            const reader = new Reader();
            const chapterNumberToContentJson = await reader.open(file);
        };
        setTimeout(() => {
            open(epubUrl).catch((e) => console.error(e));
        }, 5);
    }, [epubUrl]);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            {/* Left Column: three stacked empty divs */}
            <div
                style={{
                    flex: "0 0 300px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRight: "1px solid #ccc",
                }}
            >
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            flex: 1,
                            borderBottom: i < 2 ? "1px solid #ccc" : "none",
                        }}
                    />
                ))}
            </div>

            {/* Right Column: EPUB reader UI (exact same markup & ids) */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                }}
            >
                <div className="epub-reader-div" style={{ flex: 1 }}>
                    <div id="dimming-overlay" className="overlay"></div>
                    <div id="side-bar-button">
                        <button>☰</button>
                    </div>
                    <div id="side-bar">
                        <div id="side-bar-title"></div>
                        <div id="side-bar-author"></div>
                        {/* <img id="side-bar-cover" alt="Cover" /> */}
                        <div id="toc-view"></div>
                    </div>
                    <div id="epub_root">reader</div>

                    <div id="menu-button">
                        <button>☰</button>
                    </div>
                    <div id="header-bar"></div>

                    <div id="nav-bar">
                        <button id="left-button">←</button>
                        <input id="progress-slider" list="tick-marks" type="range" />
                        <datalist id="tick-marks"></datalist>
                        <button id="right-button">→</button>
                    </div>

                    <input
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        accept=".epub"
                    />
                    <button id="file-button" style={{ display: "none" }}>
                        Upload EPUB
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReaderComponent;
