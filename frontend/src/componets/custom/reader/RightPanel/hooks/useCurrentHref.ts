import { useEffect, useState } from "react";
import { Rendition } from "epubjs";

export function useCurrentHref(rendition: Rendition | null) {
    const [currentHref, setCurrentHref] = useState<string>("");

    useEffect(() => {
        if (!rendition) {
            return
        };

        function onRelocated(location: any) {
            if (location?.start?.href) {
                setCurrentHref(location.start.href);
            }
        }

        rendition.on("relocated", onRelocated);
        return () => {
            rendition.off("relocated", onRelocated);
        };
    }, [rendition]);

    return currentHref;
}
