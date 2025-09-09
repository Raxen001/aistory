import React from "react";
import { Button, Space } from "antd";

type Props = {
    onPrev: () => void;
    onNext: () => void;
    canPrev: boolean;
    canNext: boolean;
};

const EpubNavigation: React.FC<Props> = ({ onPrev, onNext, canPrev, canNext }) => (
    <Space style={{ marginTop: 12 }}>
        <Button onClick={onPrev} disabled={!canPrev}>
            Previous
        </Button>
        <Button onClick={onNext} disabled={!canNext}>
            Next
        </Button>
    </Space>
);

export default EpubNavigation;
