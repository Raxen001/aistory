import { Rendition } from "epubjs";

export type NavigationHandlers = {
    goNext: () => void;
    goPrev: () => void;
};

// TODO: sepearte keybinding into a separate settings.json and read from there.
// instead of hardocidng "ArrowRight" & "PageDown"
// Something like next_key_1 and next_key_2 in the json object with 'keyboard' as
// key.
// {
//  'key': {
//      "next_key_1": "ArrowRight",
//      "next_key_2": "PageDown"
//      ...
//  }
// }
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
