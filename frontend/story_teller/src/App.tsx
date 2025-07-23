import { useRef, useState, type ChangeEvent } from "react";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    useAuth,
    UserButton,
} from "@clerk/clerk-react";
import '../../../foliate-js/view.js';
import {Reader } from '../../../foliate-js/reader.js'
import { useNavigate } from "react-router";
function App() {

    const { getToken } = useAuth();
    const [data, setData] = useState(null);
    const [userText, setUserText] = useState("");
    //will be set in reader.tsx once the open is called.
    const [epubData , setEpubData] = useState<string[] | null>(null);
    const ePubFileRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const handleRef = () => {
        ePubFileRef.current?.click();
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.name.endsWith(".epub")) {
            const blobUrl = URL.createObjectURL(file);
            navigate('/reader', { state: { epubUrl: blobUrl, name: file.name , setEpubData } });
        } else {
            alert("Please upload a valid EPUB file.");
        }
    };


    async function callProtectedAuthRequired() {
        try {
            const token = await getToken();
            const res = await fetch("http://localhost:3000/v1/conciser/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "test_user_id",
                    bookId: "1231231",
                    userText: userText,
                }),
            });

            const json = await res.json();
            const parsed =
                typeof json.result === "string"
                    ? JSON.parse(json.result)
                    : json.result;
            setData(parsed);
        } catch (err) {
            console.error("Error parsing or fetching data:", err);
            setData({ error: "Failed to fetch or parse data" });
        }
    }

    const getImageUrl = (imagePath: string) => {
        return `/images/${imagePath}.png`
    };

    return (
        <header style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
            <SignedOut>
                <SignInButton />
            </SignedOut>

            <SignedIn>
                <UserButton />

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
                    onClick={callProtectedAuthRequired}
                    style={{
                        padding: "0.5em 1em",
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginBottom: "1em",
                    }}
                >
                    Submit
                </button>
                <button
                    onClick={handleRef}
                    style={{
                        marginLeft:"2em",

                        padding: "0.5em 1em",
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginBottom: "1em",
                    }}
                    id="file-button"
                    className="btn-epub"
                >
                    Upload Epub
                </button>
                <input
                type="file"
                accept=".epub"
                id="file-input"
                ref={ePubFileRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

                {data && (
                    <>
                        {data.story && data.imagePath && (
                            <>
                                <h2>Story:</h2>
                                <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
                                    {data.story}
                                </p>
                                <img
                                    src={getImageUrl(data.imagePath)}
                                />
                            </>
                        )}

                        {Array.isArray(data.characters) && (
                            <>
                                <h2>Characters:</h2>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {data.characters.map((char) => (
                                        <li
                                            key={char.personName}
                                            style={{
                                                marginBottom: "1rem",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={getImageUrl(char.imageUrl)}
                                                alt={char.personName}
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    marginRight: "1em",
                                                }}
                                            />
                                            <strong>{char.personName}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}


                        <h2>Raw JSON:</h2>
                        <pre
                            style={{
                                background: "#000",
                                color: "#fff",
                                padding: "1em",
                                borderRadius: "5px",
                                overflowX: "auto",
                                maxWidth: "90vw",
                            }}
                        >
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </>
                )}

            </SignedIn>
        </header>
    );
}

export default App;
