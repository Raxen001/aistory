import React from "react";
import { Button, Space } from "antd";

type Props = {
    onPrev: () => void;
    onNext: () => void;
    canPrev: boolean;
    canNext: boolean;
};

const EpubNavigation: React.FC<Props> = (Props) => (
    <Space style={{ marginTop: 12 }}>
        <Button onClick={Props.onPrev} disabled={!Props.canPrev}>
            Previous
        </Button>
        <Button onClick={Props.onNext} disabled={!Props.canNext}>
            Next
        </Button>
    </Space>
);

export default EpubNavigation;
