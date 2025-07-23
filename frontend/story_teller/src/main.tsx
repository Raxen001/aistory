import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App.tsx";
import { BrowserRouter, Router, Routes } from "react-router";

import { ClerkProvider } from '@clerk/clerk-react'
import ReaderComponent from "./components/reader.tsx";
import { Route } from "react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById("root")!).render(

        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/reader" element={<ReaderComponent/>} />
          </Routes>
        </BrowserRouter>
    </ClerkProvider>

);
