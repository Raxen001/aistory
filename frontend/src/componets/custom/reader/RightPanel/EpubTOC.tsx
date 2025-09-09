import React, { useState, useEffect } from "react";
import { Tree } from "antd";

export interface TocItem {
    id: string;
    href: string;
    label: string;
    subitems?: TocItem[];
    parent?: string;
}

type Props = {
    toc: TocItem[];
    onSelect: (href: string) => void;
    currentHref?: string;
};

function mapToTreeData(items: TocItem[]): any[] {
    return items.map(({ id, label, href, subitems }) => ({
        id,
        key: href,
        title: label,
        children: subitems && subitems.length > 0 ? mapToTreeData(subitems) : undefined,
    }));
}

const EpubTOC: React.FC<Props> = ({ toc, onSelect, currentHref }) => {
    const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
    const treeData = mapToTreeData(toc);

    useEffect(() => {
        setSelectedKey(currentHref);
    }, [currentHref]);

    const onSelectHandler = (selectedKeys: React.Key[]) => {
        if (selectedKeys.length === 0) return;
        const key = String(selectedKeys[0]);
        setSelectedKey(key);
        onSelect(key);
    };

    return (
        <div
            style={{
                width: 280,
                height: "100vh",
                overflowY: "auto",
                borderRight: "1px solid #f0f0f0",
                padding: 16,
                boxSizing: "border-box",
                backgroundColor: "#fafafa",
            }}
        >
            <Tree
                showLine
                selectable
                defaultExpandAll
                treeData={treeData}
                selectedKeys={selectedKey ? [selectedKey] : []}
                onSelect={onSelectHandler}
            />
        </div>
    );
};

export default EpubTOC;
