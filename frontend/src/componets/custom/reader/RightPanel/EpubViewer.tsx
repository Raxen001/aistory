import React, { useRef } from "react";
import EpubLayout from "./EpubLayout";
import { useEpubBook } from "./hooks/useEpubBook";
import { useEpubTOC } from "./hooks/useEpubTOC";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useCurrentHref } from "./hooks/useCurrentHref";

type Props = {
    file: File | null;
};

const EpubViewer: React.FC<Props> = ({ file }) => {
    const viewerRef = useRef<HTMLDivElement>(null);

    const { book, rendition, canPrev, canNext } = useEpubBook(file, viewerRef);
    const toc = useEpubTOC(book);
    const currentHref = useCurrentHref(rendition);

    const goNext = () => {
        if (rendition && canNext) rendition.next();
    };

    const goPrev = () => {
        if (rendition && canPrev) rendition.prev();
    };

    useKeyboardNavigation(goNext, goPrev, canNext, canPrev, rendition);

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
