import React from "react";
import { Reader } from "../../../../foliate-js/reader.js";

const ReaderPageLeft: React.FC = () => {
  return (
    <div
      style={{
        flex: "0 0 300px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: "1px solid #ccc",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            borderBottom: i < 2 ? "1px solid #ccc" : "none",
          }}
        />
      ))}
    </div>
  );
};

export default ReaderPageLeft;
