import { useEffect, useRef, useState } from "react";
import { Book, Rendition } from "epubjs";
import { readFile, initializeBookAndRendition } from "../utils/epubUtils.ts";
import { updateNavigationControls } from "../utils/epubNavigationConfig.ts";

export function useEpubBook(file: File | null, viewerRef: React.RefObject<HTMLDivElement|null> ) {
    const renditionRef = useRef<Rendition | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);

    useEffect(() => {
        if (!file || !viewerRef || !viewerRef.current) {
            renditionRef.current?.destroy();
            renditionRef.current = null;
            setBook(null);
            setRendition(null);
            setCanPrev(false);
            setCanNext(false);
            return;
        }

        renditionRef.current?.destroy();
        renditionRef.current = null;

        readFile(
            file,
            (buffer: any) => {
                const { book: newBook, rendition: newRendition } = initializeBookAndRendition(buffer, viewerRef.current!);

                newRendition.on("rendered", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));
                newRendition.on("relocated", () => updateNavigationControls(newRendition, setCanPrev, setCanNext));

                renditionRef.current = newRendition;
                setBook(newBook);
                setRendition(newRendition);
                updateNavigationControls(newRendition, setCanPrev, setCanNext);
            },
            (error: any) => {
                console.error("Error reading EPUB file", error);
            }
        );

        return () => {
            renditionRef.current?.destroy();
            renditionRef.current = null;
            setBook(null);
            setRendition(null);
            setCanPrev(false);
            setCanNext(false);
        };
    }, [file, viewerRef]);

    return { book, rendition, canPrev, canNext };
}
