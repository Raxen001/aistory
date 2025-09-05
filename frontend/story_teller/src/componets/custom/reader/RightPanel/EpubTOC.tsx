import React from "react";
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
};

function mapToTreeData(items: TocItem[]): any[] {
    return items.map(({ id, label, href, subitems }) => ({
        key: href,
        title: label,
        children: subitems && subitems.length > 0 ? mapToTreeData(subitems) : undefined,
    }));
}

const EpubTOC: React.FC<Props> = ({ toc, onSelect }) => {
    const treeData = mapToTreeData(toc);

    const onSelectHandler = (selectedKeys: React.Key[]) => {
        if (selectedKeys.length === 0) return;
        onSelect(String(selectedKeys[0]));
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
                defaultExpandAll
                treeData={treeData}
                onSelect={onSelectHandler}
                selectable
            />
        </div>
    );
};

export default EpubTOC;
