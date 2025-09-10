import ePub, { Book, Rendition } from "epubjs";
import 'foliate-js/view.js'

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

    return { book, rendition };
}
