import React, { useRef, useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import ePub, { Book, Rendition } from "epubjs";

export interface EpubProps {
    setEpubData?: Dispatch<SetStateAction<string[] | null>>;
}

const Epub: React.FC<EpubProps> = ({ setEpubData }) => {
    const ePubFileRef = useRef<HTMLInputElement | null>(null);
    const viewerRef = useRef<HTMLDivElement | null>(null);
    const bookRef = useRef<Book | null>(null);
    const renditionRef = useRef<Rendition | null>(null);
    const [bookLoaded, setBookLoaded] = useState(false);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            renditionRef.current?.destroy?.();
            bookRef.current?.destroy?.();
        };
    }, []);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";

        if (!file || !file.name.endsWith(".epub")) {
            alert("Please upload a valid EPUB file.");
            return;
        }

        // Cleanup previous book/rendition if necessary
        renditionRef.current?.destroy?.();
        bookRef.current?.destroy?.();

        try {
            const arrayBuffer = await file.arrayBuffer();
            const book = ePub(arrayBuffer);
            await book.ready;
            bookRef.current = book;

            // Display the book using epub.js's renderer
            if (viewerRef.current) {
                const rendition = book.renderTo(viewerRef.current, {
                    width: "100%",
                    height: 800,
                });
                renditionRef.current = rendition;
                rendition.display();

                setBookLoaded(true);

                // (Optional) Listen for location changes:
                // rendition.on("relocated", (location) => {
                //     console.log("Current location:", location);
                // });
            }

            // (Optional) Extract chapter text for summaries/pipelines
            if (setEpubData) {
                const sectionPromises: Promise<string>[] = [];
                book.spine.each((section: any) => {
                    const sectionPromise = (async () => {
                        const chapter = await book.load(section.href);
                        if (!(chapter instanceof Document) || !chapter.body?.textContent) {
                            return "";
                        }
                        return chapter.body.textContent.trim();
                    })();
                    sectionPromises.push(sectionPromise);
                });
                const content = await Promise.all(sectionPromises);
                setEpubData(content);
            }
        } catch (error) {
            alert("Failed to load EPUB: " + (error as Error).message);
            setEpubData?.(null);
            setBookLoaded(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => ePubFileRef.current?.click()}
                style={{ margin: "1em 0", padding: "0.5em 1em", fontSize: "1rem" }}
            >
                Upload Epub
            </button>
            <input
                type="file"
                accept=".epub"
                ref={ePubFileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <h1>Read EPUB with epub.js</h1>
            <div
                ref={viewerRef}
                id="epubjs-viewer"
                style={{
                    border: "1px solid #ccc",
                    minHeight: 800,
                    width: 600,
                    margin: "2em auto",
                    background: "#fff",
                }}
            />
            {!bookLoaded && (
                <div style={{ textAlign: "center", color: "#888" }}>(No book loaded)</div>
            )}
        </div>
    );
};

export default Epub;
