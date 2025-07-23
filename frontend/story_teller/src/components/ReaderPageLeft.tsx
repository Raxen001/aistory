import React, { useEffect, useRef } from "react";
import { Reader } from "../../../../foliate-js/reader.js";

const ReaderPageLeft: React.FC = () => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const observer = new MutationObserver((mutationRecords) => {
            mutationRecords.forEach((record) => {
                console.log(
                    `${record.attributeName} has changed to ${el.getAttribute(
                        record.attributeName!
                    )}`
                );
            });
        });

        observer.observe(el, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            style={{
                flex: "0 0 40%",
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

            <span
                id="pageContents"
                style={{ display: "none" }}
                data-pagecontents={null}
                ref={elementRef}
            ></span>

        </div>
    );
};

export default ReaderPageLeft;
