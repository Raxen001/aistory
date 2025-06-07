import { useState } from "react";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    useAuth,
    UserButton,
} from "@clerk/clerk-react";

function App() {
    const { getToken } = useAuth();
    const [data, setData] = useState({});
    const [userText, setUserText] = useState("");

    async function callProtectedAuthRequired() {
        const token = await getToken();
        const res = await fetch("http://localhost:3000/v1/app/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: "hashah",
                userText: userText,
            }),
        });
        const json = await res.json();

        try {
            // Safely parse the nested string JSON
            const parsed = typeof json.result === "string" ? JSON.parse(json.result) : json.result;
            setData(parsed);
        } catch (err) {
            setData(json);
        }
    }

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
                        maxWidth: "500px"
                    }}
                />

                <button
                    onClick={callProtectedAuthRequired}
                    style={{
                        padding: "0.5em 1em",
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginBottom: "1em"
                    }}
                >
                    Submit
                </button>

                <h2>Data from API:</h2>
                <pre
                    style={{
                        background: "#000",
                        padding: "1em",
                        borderRadius: "5px",
                        overflowX: "auto",
                        maxWidth: "90vw"
                    }}
                >
                    {JSON.stringify(data, null, 2)}
                </pre>
            </SignedIn>
        </header>
    );
}

export default App;
