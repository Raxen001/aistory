import React from "react";

interface StoryInputProps {
    userText: string;
    setUserText: (text: string) => void;
    onSubmit: () => void;
    loading?: boolean;
}

const StoryInput: React.FC<StoryInputProps> = ({ userText, setUserText, onSubmit, loading }) => (
    <div>
        <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Enter your text here"
            rows={4}
            cols={50}
            style={{
                display: "block",
                margin: "1em 0",
                padding: "0.5em",
                fontSize: "1rem",
                width: "100%",
                maxWidth: "500px",
            }}
        />
        <button
            onClick={onSubmit}
            style={{
                padding: "0.5em 1em",
                fontSize: "1rem",
                cursor: "pointer",
                marginBottom: "1em",
            }}
            disabled={loading}
        >
            {loading ? "Submitting..." : "Submit"}
        </button>
    </div>
);

export default StoryInput;
