import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { useRef } from "react";
import { useEffect } from "react";
import { openEpub } from "../../../foliate-js/reader"
import { useState } from "react";


export default function RightPanel(){
    const fileInputRef = useRef(null);
    const [epubFile , setEpubFile] = useState(null);
    const viewContainerRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            console.log("Selected EPUB:", file);
            setEpubFile(file);
        }
    }
    useEffect(() => {
        if (epubFile && viewContainerRef.current) {
            openEpub(epubFile, viewContainerRef.current).catch(console.error)
        }
    }, [epubFile])
    

    return(
        <>
            <div className="right-panel-container rounded-md ">
                <Tabs defaultValue="account" className="w-[400px] p-2 bg-[#333333] w-full">
                    <input
                        type="file"
                        accept=".epub"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    <Button size="sm" className=" cursor-pointer p-0 w-[14vh]" onClick={handleButtonClick} >
                        ↑ Upload epub
                    </Button>
                </Tabs>
                <div
                    ref={viewContainerRef}
                    id="reader-container"
                    className="mt-4 h-[80vh] "
                    style={{ overflow: 'auto', position: 'relative' }}
                >
                            <div id="dimming-overlay" aria-hidden="true"></div>
                    <div id="side-bar">
                        <div id="side-bar-header">
                            <img id="side-bar-cover"></img>
                                <div>
                                    <h1 id="side-bar-title"></h1>
                                    <p id="side-bar-author"></p>
                                </div>
                        </div>
                        <div id="toc-view"></div>
                    </div>
                    <div id="header-bar" class="toolbar">
                        <button id="side-bar-button" aria-label="Show sidebar">
                            <svg class="icon" width="24" height="24" aria-hidden="true">
                                <path d="M 4 6 h 16 M 4 12 h 16 M 4 18 h 16" />
                            </svg>
                        </button>
                        <div id="menu-button" class="menu-container">
                            <button aria-label="Show settings" aria-haspopup="true">
                                <svg class="icon" width="24" height="24" aria-hidden="true">
                                    <path d="M5 12.7a7 7 0 0 1 0-1.4l-1.8-2 2-3.5 2.7.5a7 7 0 0 1 1.2-.7L10 3h4l.9 2.6 1.2.7 2.7-.5 2 3.4-1.8 2a7 7 0 0 1 0 1.5l1.8 2-2 3.5-2.7-.5a7 7 0 0 1-1.2.7L14 21h-4l-.9-2.6a7 7 0 0 1-1.2-.7l-2.7.5-2-3.4 1.8-2Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id="nav-bar" class="toolbar">
                        <button id="left-button" aria-label="Go left">
                            <svg class="icon" width="24" height="24" aria-hidden="true">
                                <path d="M 15 6 L 9 12 L 15 18" />
                            </svg>
                        </button>
                        <input id="progress-slider" type="range" min="0" max="1" step="any" list="tick-marks"></input>
                            <datalist id="tick-marks"></datalist>
                            <button id="right-button" aria-label="Go right">
                                <svg class="icon" width="24" height="24" aria-hidden="true">
                                    <path d="M 9 6 L 15 12 L 9 18" />
                                </svg>
                            </button>
                    </div>







                    </div>
            </div>
        </>
    )
}