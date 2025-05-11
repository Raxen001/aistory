import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId="339995647490-vhs9vjhc02cukolrcu1h368munbaha20.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
);
