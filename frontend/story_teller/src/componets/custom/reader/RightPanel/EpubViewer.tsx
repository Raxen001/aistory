import React, { useEffect, useRef, useState } from "react";
import { Book, Rendition, type NavItem } from "epubjs";
import { setupKeyboardNavigation, updateNavigationControls } from "./epubNavigationConfig";
import { readFile, initializeBookAndRendition } from "./epubUtils";
import EpubNavigation from "./EpubNavigation";
import EpubTOC from "./EpubTOC";

type Props = {
    file: File | null;
};

const EpubViewer: React.FC<Props> = ({ file }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [toc, setToc] = useState<NavItem[] | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        if (!file || !viewerRef.current) {
            rendition?.destroy();
            setBook(null);
            setRendition(null);
            setToc(null);
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
            setToc(null);
        };
    }, [file]);

    const goNext = () => {
        if (rendition && canNext) {
            rendition.next();
        }
    };

    const goPrev = () => {
        if (rendition && canPrev) {
            rendition.prev();
        }
    };

    useEffect(() => {
        const keyboardHandler = setupKeyboardNavigation({ goNext, goPrev });
        window.addEventListener("keydown", keyboardHandler);
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        };
    }, [canNext, canPrev, rendition]);

    useEffect(() => {
        async function getTOC() {
            if (book?.loaded?.navigation) {
                try {
                    const navigation = await book.loaded.navigation;
                    setToc(navigation?.toc ?? []);
                    // DEBUG: TOC
                    console.log(navigation?.toc);
                } catch (error) {
                    console.error("Failed to load TOC:", error);
                }
            }
        }
        getTOC();
    }, [book]);

    // TOC item selection handler to navigate rendition
    const handleTocSelect = (href: string) => {
        rendition?.display(href);
    };

    return (
        <div
            style={{
                marginTop: 24,
                background: "#fff",
                borderRadius: 8,
                padding: 16,
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
            }}
        >
            {/* Left: Table of Contents */}
            <div style={{ width: 280, borderRight: "1px solid #ddd" }}>
                {toc && <EpubTOC toc={toc} onSelect={handleTocSelect} />}
            </div>

            {/* Right: Viewer + Navigation */}
            <div
                style={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    paddingLeft: 16,
                }}
            >
                {file ? (
                    <>
                        <div ref={viewerRef} style={{ flexGrow: 1 }} />
                        <EpubNavigation onPrev={goPrev} onNext={goNext} canPrev={canPrev} canNext={canNext} />
                    </>
                ) : (
                    <div>No EPUB uploaded.</div>
                )}
            </div>
        </div>
    );
};

export default EpubViewer;
