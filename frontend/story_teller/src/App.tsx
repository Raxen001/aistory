import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';

function App() {
  const { getToken } = useAuth()
  const [data, setData] = useState({})

  async function callProtectedAuthRequired() {
    const token = await getToken()
    const res = await fetch('http://localhost:3000/v1/app/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    setData(json)
  }
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <button onClick={callProtectedAuthRequired}>Call /protected-auth-required</button>
        <h1>Data from API:</h1>
        <p>{JSON.stringify(data, null, 2)}</p>
      </SignedIn>
    </header>
  );
}

export default App;
