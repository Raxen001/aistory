import { useState } from "react";
import { Row, Col } from "antd";
import PlotSummary from "../LeftPanel/PlotSummary";
import CharacterList from "../LeftPanel/CharacterList";
import PlayerControls from "../LeftPanel/PlayerControls";
import EpubUploader from "../RightPanel/EpubUploader";
import EpubViewer from "../RightPanel/EpubViewer";

const ReaderLayout = () => {
    const [epubFile, setEpubFile] = useState<File | null>(null);

    return (
        <Row style={{ height: "100vh" }}>
            <Col
                span={8}
                style={{
                    background: "#17171a",
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    padding: 24,
                }}
            >
                <PlotSummary />
                <CharacterList />
                <PlayerControls />
            </Col>
            <Col
                span={16}
                style={{
                    background: "#222",
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <EpubUploader onFileChange={setEpubFile} />
                <EpubViewer file={epubFile} />
            </Col>
        </Row>
    );
};

export default ReaderLayout;
