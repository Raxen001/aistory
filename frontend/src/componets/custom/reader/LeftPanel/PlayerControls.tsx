import { Button, Space } from "antd";

const PlayerControls = () => (
    <div
        style={{
            background: "#222",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            minHeight: 60,
        }}
    >
        <Space>
            <Button type="primary" shape="circle" size="middle">
                ⏸️
            </Button>
            <div style={{ color: "#bbc" }}>lofi read</div>
        </Space>
    </div>
);

export default PlayerControls;
