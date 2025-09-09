import React, { useEffect, useRef, useState } from "react";
import { Book, Rendition, type NavItem } from "epubjs";
import { readFile, initializeBookAndRendition } from "./epubUtils";
import { setupKeyboardNavigation, updateNavigationControls } from "./epubNavigationConfig";
import EpubLayout from "./EpubLayout";

type Props = {
    file: File | null;
};

const EpubViewer: React.FC<Props> = ({ file }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const renditionRef = useRef<Rendition | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [toc, setToc] = useState<NavItem[] | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const [currentHref, setCurrentHref] = useState<string>("");

    useEffect(() => {
        if (!file || !viewerRef.current) {
            renditionRef.current?.destroy();
            renditionRef.current = null;
            setBook(null);
            setRendition(null);
            setToc(null);
            return;
        }

        renditionRef.current?.destroy();
        renditionRef.current = null;

        readFile(
            file,
            (buffer) => {
                const { book: newBook, rendition: newRendition } = initializeBookAndRendition(buffer, viewerRef.current!);

                newRendition.on("rendered", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));
                newRendition.on("relocated", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));

                renditionRef.current = newRendition;

                setBook(newBook);
                setRendition(newRendition);
                updateNavigationControls(newRendition, setCanPrev, setCanNext);
            },
            (error) => {
                console.error("Error reading EPUB file", error);
            }
        );

        return () => {
            renditionRef.current?.destroy();
            renditionRef.current = null;
            setBook(null);
            setRendition(null);
            setToc(null);
        };
    }, [file]);

    useEffect(() => {
        async function getTOC() {
            if (book?.loaded?.navigation) {
                try {
                    const navigation = await book.loaded.navigation;
                    setToc(navigation?.toc ?? []);
                } catch (error) {
                    console.error("Failed to load TOC:", error);
                }
            }
        }

        getTOC();
    }, [book]);

    const goNext = () => {
        if (rendition && canNext) rendition.next();
        console.log(rendition?.getContents());
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

    useEffect(() => {
        if (!rendition) {
            return
        };

        function handleRelocated(location: any) {
            if (location && location.start && location.start.href) {
                setCurrentHref(location.start.href);
            }
        }

        rendition.on("relocated", handleRelocated);

        return () => {
            rendition.off("relocated", handleRelocated);
        };
    }, [rendition]);

    const handleTocSelect = (href: string) => {
        rendition?.display(href);
    };

    return (
        <EpubLayout
            toc={toc}
            onTocSelect={handleTocSelect}
            canPrev={canPrev}
            canNext={canNext}
            onPrev={goPrev}
            onNext={goNext}
            viewerRef={viewerRef}
            fileLoaded={!!file}
            currentHref={currentHref}
        />
    );
};

export default EpubViewer;
