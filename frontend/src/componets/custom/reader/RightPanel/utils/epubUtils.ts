import ePub, { Book, Rendition, EpubCFI } from "epubjs";
import { fetchConciser } from "../data/useConciser";

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
        fetchConciser(iframe.document.body.innerText);
        highlightFirstTenLines(section, iframe, rendition);
    });

    return { book, rendition };
}


function highlightFirstTenLines(section: { cfiFromRange: (arg0: any) => string | Node | Range | undefined; }, iframe: { document: any; }, rendition: Rendition) {
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
            const wordIndexInNode = wordsToHighlight - wordCount;
            let charCount = 0;
            for (let i = 0; i < wordIndexInNode; i++) {
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

    if (startNode && endNode) {
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);

        let highlightRange = new EpubCFI(section.cfiFromRange(range)).toString();

        rendition.annotations.highlight(highlightRange, {}, (e: { target: any }) => {
            console.log("highlight clicked", e.target);
        });
    } else {
        console.warn("Could not find first 10 words to highlight");
    }
}
