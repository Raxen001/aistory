import React, { useEffect, useRef, useState } from "react";
import { Book, Rendition } from "epubjs";
import { readFile, initializeBookAndRendition } from "./epubUtils";
import EpubNavigation from "./EpubNavigation";
import { setupKeyboardNavigation, updateNavigationControls } from "./epubNavigationConfig";

type Props = {
    file: File | null;
};

const EpubViewer: React.FC<Props> = ({ file }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        if (!file || !viewerRef.current) {
            rendition?.destroy();
            setBook(null);
            setRendition(null);
            return;
        }

        readFile(
            file,
            (buffer) => {
                const { book: newBook, rendition: newRendition } = initializeBookAndRendition(buffer, viewerRef.current!);

                newRendition.on("rendered", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));
                newRendition.on("relocated", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));

                setBook(newBook);
                setRendition(newRendition);

                updateNavigationControls(newRendition, setCanPrev, setCanNext);
            },
            (error) => {
                console.error("Error reading EPUB file", error);
            }
        );

        return () => {
            rendition?.destroy();
            setBook(null);
            setRendition(null);
        };
    }, [file]);

    const goNext = () => {
        if (rendition && canNext) rendition.next();
    };

    const goPrev = () => {
        if (rendition && canPrev) rendition.prev();
    };

    useEffect(() => {
        const keyboardHandler = setupKeyboardNavigation({ goNext, goPrev });
        window.addEventListener("keydown", keyboardHandler);
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        };
    }, [canNext, canPrev, rendition]);

    return (
        <div
            style={{
                marginTop: 24,
                background: "#fff",
                borderRadius: 8,
                padding: 16,
                height: "100%",
                overflow: "auto",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {file ? (
                <>
                    <div style={{ flexGrow: 1 }} ref={viewerRef} />
                    <EpubNavigation onPrev={goPrev} onNext={goNext} canPrev={canPrev} canNext={canNext} />
                </>
            ) : (
                <div>No EPUB uploaded.</div>
            )}
        </div>
    );
};

export default EpubViewer;
