import React from "react";
import { Layout } from "antd";
import CollapsibleSidebar from "./CollapsibleSidebar";
import EpubNavigation from "./EpubNavigation";

const { Content } = Layout;

type Props = {
    toc: any[] | null;
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
    <Layout
        style={{
            marginTop: 24,
            background: "#fff",
            borderRadius: 8,
            padding: 0,
            height: "100%",
            overflow: "hidden",
            flexGrow: 1,
        }}
    >
        <CollapsibleSidebar toc={toc} onTocSelect={onTocSelect} currentHref={currentHref} />
        <Layout>
            <Content
                style={{
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
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
            </Content>
        </Layout>
    </Layout>
);

export default EpubLayout;
