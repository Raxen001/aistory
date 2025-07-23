import React, { useEffect } from "react";
import { Reader } from "../../../../foliate-js/reader.js";
import ReaderSideBar from "./ReaderSideBar";
import ProgressBar from "./ProgressBar";
import EpubReader from "./EpubReader";

interface ReaderPageRightProps {
    epubUrl?: string;
}

const ReaderPageRight: React.FC<ReaderPageRightProps> = ({ epubUrl }) => {
    useEffect(() => {
        if (!epubUrl) {
            alert("No EPUB file provided.");
            return;
        }
        const open = async (file: string) => {
            const reader = new Reader();
            await reader.open(file);
        };

        const timer = setTimeout(() => {
            open(epubUrl).catch((e) => console.error(e));
        }, 5);

        return () => clearTimeout(timer);
    }, [epubUrl]);

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <ReaderSideBar />
            <ProgressBar />
            <EpubReader />
        </div>
    );
};

export default ReaderPageRight;
