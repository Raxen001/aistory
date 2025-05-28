import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const { getToken } = useAuth();
  const [data, setData] = useState({});

  async function callProtectedAuthRequired() {
    const token = await getToken();
    const res = await fetch("http://localhost:3000/v1/app/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "hashah",
        userText: "asdfsaaasdfasdfasdf",
      }),
    });
    const json = await res.json();
    setData(json);
  }
  return (
    <header>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <button onClick={callProtectedAuthRequired}>button</button>
        <h1>Data from API:</h1>
        <p>{JSON.stringify(data, null, 2)}</p>
      </SignedIn>
    </header>
  );
}

export default App;
