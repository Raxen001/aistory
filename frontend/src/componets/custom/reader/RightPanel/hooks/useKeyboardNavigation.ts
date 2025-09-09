import { useEffect } from "react";
import { setupKeyboardNavigation } from "../utils/epubNavigationConfig";

export function useKeyboardNavigation(
    goNext: () => void,
    goPrev: () => void,
    canNext: boolean,
    canPrev: boolean,
    rendition: any
) {
    useEffect(() => {
        const handler = setupKeyboardNavigation({ goNext, goPrev });
        window.addEventListener("keydown", handler);

        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [goNext, goPrev, canNext, canPrev, rendition]);
}
