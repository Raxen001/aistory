import ePub, { Book, Rendition, EpubCFI } from "epubjs";

export function readFile(
    file: File,
    onLoad: (buffer: ArrayBuffer) => void,
    onError: (error: ProgressEvent<FileReader>) => void
) {
    const reader = new FileReader();
    reader.onload = (e) => {
        if (e.target?.result) {
            onLoad(e.target.result as ArrayBuffer);
        }
    };
    reader.onerror = (e) => {
        onError(e);
    };
    reader.readAsArrayBuffer(file);
}

export function initializeBookAndRendition(
    buffer: ArrayBuffer,
    container: HTMLDivElement
): { book: Book; rendition: Rendition } {
    const book = ePub(buffer);
    const rendition = book.renderTo(container, { width: "100%", height: "100%" });

    rendition.display();

    rendition.on("rendered", (section: any, iframe: { document: Document }) => {
        const doc = iframe.document;
        const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null, false);

        let wordCount = 0;
        let range = doc.createRange();
        let startNode: Node | null = null;
        let startOffset = 0;
        let endNode: Node | null = null;
        let endOffset = 0;
        let wordsToHighlight = 10;

        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (!startNode) {
                startNode = node;
                startOffset = 0;
            }

            const text = node.textContent || "";
            const words = text.match(/\S+/g) || [];

            if (wordCount + words.length >= wordsToHighlight) {
                // Find word position where to end the highlight
                const wordIndexInNode = wordsToHighlight - wordCount;
                // Calculate the character offset for the end of the last word in this node
                let charCount = 0;
                for (let i = 0; i < wordIndexInNode; i++) {
                    // Add length of word + 1 for space, except for last word no trailing space
                    charCount += words[i].length;
                    if (i < wordIndexInNode - 1) charCount++;
                }

                endNode = node;
                endOffset = charCount;
                break;
            } else {
                wordCount += words.length;
            }
        }

        // If we found start and end nodes, create range
        if (startNode && endNode) {
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);

            // Create EpubCFI from the range
            let highlightRange = new EpubCFI(section.cfiFromRange(range)).toString();

            rendition.annotations.highlight(highlightRange, {}, (e: { target: any }) => {
                console.log("highlight clicked", e.target);
            });
        } else {
            console.warn("Could not find first 10 words to highlight");
        }
    });

    return { book, rendition };
}
