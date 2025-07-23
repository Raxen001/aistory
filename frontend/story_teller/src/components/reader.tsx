import { useEffect } from "react";
import {Reader} from "../../../../foliate-js/reader.js"
import { useLocation } from "react-router";
function ReaderComponent(){
    const location = useLocation();
    //have used url as data between router can be passed as blob or url.. , and view.open()  accepts url/blob.. might modify it in future.
    const { epubUrl , setEpubData} = location.state || {};
    useEffect(() => {
        if (!epubUrl) {
            alert("No EPUB file provided.");
            return;
        }
        const open = async (file) => {
            const reader = new Reader();
            const chapterNumberToContentJson = await reader.open(file);
            setEpubData(chapterNumberToContentJson);
        }
        //to wait for jsx to get into dom , i forgot the name for it lol.
        setTimeout(() => {
            open(epubUrl).catch(e => console.error(e));
        }, 5);
    }, [epubUrl]);
    return(
        <>
            <div className="epub-reader-div">
            <div id="dimming-overlay" className="overlay"></div>
            <div id="side-bar-button"><button>☰</button></div>
            <div id="side-bar">
                <div id="side-bar-title"></div>
                <div id="side-bar-author"></div>
                <img id="side-bar-cover" />
                <div id="toc-view"></div>
            </div>

            <div id="menu-button"><button>☰</button></div>
            <div id="header-bar"></div>

            <div id="nav-bar">
                <button id="left-button">←</button>
                <input id="progress-slider" list="tick-marks" type="range" />
                <datalist id="tick-marks"></datalist>
                <button id="right-button">→</button>
            </div>

            <input id="file-input" type="file" style={{ display:"none"}} />
            <button id="file-button" style={{ display:"none"}}>Upload EPUB</button>
            </div>
        </>

    )   
}
export default ReaderComponent;