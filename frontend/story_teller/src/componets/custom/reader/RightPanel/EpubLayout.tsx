import React from "react";
import EpubTOC, { type TocItem } from "./EpubTOC";
import EpubNavigation from "./EpubNavigation";

type Props = {
    toc: TocItem[] | null;
    onTocSelect: (href: string) => void;
    canPrev: boolean;
    canNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    viewerRef: React.RefObject<HTMLDivElement | null>;
    fileLoaded: boolean;
    currentHref?: string;
    children?: React.ReactNode;
};

const EpubLayout: React.FC<Props> = ({
    toc,
    onTocSelect,
    canPrev,
    canNext,
    onPrev,
    onNext,
    viewerRef,
    fileLoaded,
    currentHref,
    children,
}) => (
    <div
        style={{
            marginTop: 24,
            background: "#fff",
            borderRadius: 8,
            padding: 16,
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
        }}
    >

        {/* Left side: Table of Contents with currentHref */}
        <div style={{ width: 280, borderRight: "1px solid #ddd" }}>
            {toc && <EpubTOC toc={toc} onSelect={onTocSelect} currentHref={currentHref} />}
        </div>

        {/* Right side: Viewer and Navigation */}
        <div
            style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                paddingLeft: 16,
            }}
        >
            {fileLoaded ? (
                <>
                    <div ref={viewerRef} style={{ flexGrow: 1 }} />
                    <EpubNavigation onPrev={onPrev} onNext={onNext} canPrev={canPrev} canNext={canNext} />
                </>
            ) : (
                <div>No EPUB uploaded.</div>
            )}
            {children}
        </div>

    </div>
);

export default EpubLayout;
