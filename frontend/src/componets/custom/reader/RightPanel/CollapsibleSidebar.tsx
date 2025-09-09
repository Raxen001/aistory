import React, { useState } from "react";
import { Layout } from "antd";
import EpubTOC, { type TocItem } from "./EpubTOC";

const { Sider } = Layout;

type Props = {
    toc: TocItem[] | null;
    onTocSelect: (href: string) => void;
    currentHref?: string;
};

const CollapsibleSidebar: React.FC<Props> = ({ toc, onTocSelect, currentHref }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={280}
            style={{
                backgroundColor: "#fafafa",
                borderRight: "1px solid #ddd",
                boxSizing: "border-box",
                height: "100vh",
                overflowY: "auto",
                color: "white",
            }}
        >
            {!collapsed && toc && <EpubTOC toc={toc} onSelect={onTocSelect} currentHref={currentHref} />}
        </Sider>
    );
};

export default CollapsibleSidebar;
