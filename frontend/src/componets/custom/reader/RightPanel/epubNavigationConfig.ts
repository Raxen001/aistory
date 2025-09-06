import { Rendition } from "epubjs";

export type NavigationHandlers = {
    goNext: () => void;
    goPrev: () => void;
};

export function setupKeyboardNavigation(handlers: NavigationHandlers): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowRight":
            case "PageDown":
                handlers.goNext();
                break;
            case "ArrowLeft":
            case "PageUp":
                handlers.goPrev();
                break;
        }
    };
}

export function updateNavigationControls(
    rendition: Rendition,
    setCanPrev: (value: boolean) => void,
    setCanNext: (value: boolean) => void
) {
    setCanPrev(rendition?.location?.start?.index !== 0);
    setCanNext(!rendition?.location?.atEnd);
}
