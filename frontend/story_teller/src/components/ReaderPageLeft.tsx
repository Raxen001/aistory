import React, { useEffect, useRef, useState, useCallback } from "react";
import { callConciserApi, type ConciserResponse } from "./conciser.service";

interface Character {
    personName: string;
    imageUrl: string;
}

interface ReaderPageLeftProps {
    userId: string;
    bookId: string;
    token: string;
}

const ReaderPageLeft: React.FC<ReaderPageLeftProps> = ({ userId, bookId, token }) => {
    const elementRef = useRef<HTMLSpanElement>(null);

    const [story, setStory] = useState<string>("");
    const [characters, setCharacters] = useState<Character[]>([]);
    const [imagePath, setImagePath] = useState<string>("");

    const getImageUrl = (imagePath: string) => `/images/${imagePath}.png`;

    const fetchData = useCallback(
        async (userText: string | null) => {
            console.log("Fuck")
            console.log(userText);

            if (!userText) return;
            if (!userText.trim()) return;

            console.log('fuck')
            console.log(userText)


            const userId = "test_user_id";
            const bookId = "1231231";

            try {
                const response: ConciserResponse = await callConciserApi(token, {
                    userId,
                    bookId,
                    userText,
                });

                setStory(response.story || "");
                setCharacters(response.characters || []);
                setImagePath(response.imagePath || "");
            } catch (err) {
                console.error("Failed to fetch conciser API:", err);
            }
        },
        [userId, bookId, token]
    );

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        const observer = new MutationObserver((mutationRecords) => {
            mutationRecords.forEach((record) => {
                fetchData(el.getAttribute('data-page-contents'));
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
    }, [fetchData]);

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
            {/* Story */}
            <div
                style={{
                    flex: 1,
                    padding: "1rem",
                    overflowY: "auto",
                    borderBottom: "1px solid #ccc",
                    whiteSpace: "pre-wrap",
                }}
            >
                {story}
            </div>

            {/* Characters list */}
            <div
                style={{
                    flex: 1,
                    padding: "1rem",
                    overflowY: "auto",
                    borderBottom: "1px solid #ccc",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {characters.length > 0 ? (
                    characters.map(({ personName, imageUrl }) => (
                        <div
                            key={personName}
                            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                        >
                            <img
                                src={getImageUrl(imageUrl)}
                                alt={personName}
                                style={{ width: 50, height: 50, objectFit: "cover" }}
                            />
                            <span>{personName}</span>
                        </div>
                    ))
                ) : (
                    <em>No characters available.</em>
                )}
            </div>

            {/* Image */}
            <div
                style={{
                    flex: 1,
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {imagePath ? (
                    <img
                        src={getImageUrl(imagePath)}
                        alt="Story visual"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                ) : (
                    <em>No image available.</em>
                )}
            </div>

            {/* Hidden span to observe */}
            <span
                id="pageContents"
                style={{ display: "none" }}
                data-pagecontents={null}
                ref={elementRef}
            />
        </div>
    );
};

export default ReaderPageLeft;
