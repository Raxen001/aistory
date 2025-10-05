import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button"
import { useRef } from "react";
import { useEffect } from "react";
import { openEpub } from "../../../foliate-js/reader"
import { useState } from "react";
import { Dropdown } from "../DropDown";


export default function RightPanel(){
    const fileInputRef = useRef(null);
    const [epubFile , setEpubFile] = useState(null);
    const viewContainerRef = useRef(null);
     const [viewInstance, setViewInstance] = useState(null);
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
            openEpub(epubFile, viewContainerRef.current)
             .then((view) => setViewInstance(view))
             .catch(console.error);
        }
    }, [epubFile])

    const handleLayoutChange = (layout) => {
        console.log(viewInstance)
        viewInstance?.renderer.setAttribute("flow", layout);
    };
    

    return(
        <>
            <div className="right-panel-container rounded-md ">
                <Tabs defaultValue="account" className="w-[400px] p-2 flex flex-row justify-between  rounded-md bg-[#333333] w-full">
                    <input
                        type="file"
                        accept=".epub"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    <Button size="sm" className=" cursor-pointer p-[18px]" onClick={handleButtonClick} >
                        ↑ Upload epub
                    </Button>
                    <div className="layoutDropDownContainer invisible">
                        <Dropdown
                            onChange={handleLayoutChange}
                        />
                    </div>
                </Tabs>
                <div
                    ref={viewContainerRef}
                    id="reader-container"
                    className="mt-8"
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
                    
                    <div id="nav-bar" className="toolbar">
                        <button id="left-button" aria-label="Go left">
                            <svg className="icon" width="24" height="24" aria-hidden="true">
                                <path d="M 15 6 L 9 12 L 15 18" />
                            </svg>
                        </button>
                        <input id="progress-slider" type="range" min="0" max="1" step="any" list="tick-marks"></input>
                            <datalist id="tick-marks"></datalist>
                            <button id="right-button" aria-label="Go right">
                                <svg className="icon" width="24" height="24" aria-hidden="true">
                                    <path d="M 9 6 L 15 12 L 9 18" />
                                </svg>
                            </button>
                    </div>







                    </div>
            </div>
        </>
    )
}