import { Avatar, Space } from "antd";

const CharacterList = () => (
    <div
        style={{
            background: "#222",
            color: "#fff",
            padding: 16,
            borderRadius: 8,
            minHeight: 120,
        }}
    >
        <Space size="middle">
            <Avatar shape="square" size={48} src="https://static.toiimg.com/thumb/msid-67586673,width-400,resizemode-4/67586673.jpg" />
            {/* Additional avatars can be added here */}
        </Space>
    </div>
);

export default CharacterList;
