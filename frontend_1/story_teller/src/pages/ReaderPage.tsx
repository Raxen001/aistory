import React from "react";
import ReaderPageLeft from "../components/ReaderPageLeft.tsx";
import ReaderPageRight from "../components/ReaderPageRight.tsx";
import { useLocation, useNavigate } from "react-router";

const ReaderPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { epubUrl } = location.state || {};

    if (!epubUrl) {
        navigate('/');
    }


    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                // overflow: "hidden",
            }}
        >
            <ReaderPageLeft />
            <ReaderPageRight epubUrl={epubUrl} />
        </div>
    );
};

export default ReaderPage;
