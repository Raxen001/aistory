import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type Props = {
    onFileChange: (file: File | null) => void;
};

const EpubUploader: React.FC<Props> = ({ onFileChange }) => {
    return (
        <Upload
            accept=".epub"
            beforeUpload={(file) => {
                onFileChange(file);
                return false; // prevent automatic upload
            }}
            showUploadList={false}
        >
            <Button icon={<UploadOutlined />}>Upload EPUB</Button>
        </Upload>
    );
};

export default EpubUploader;
