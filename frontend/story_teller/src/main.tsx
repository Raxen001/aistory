import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ClerkProvider, RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import ReaderPage from "./pages/ReaderPage";
import { Spin } from 'antd';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
}

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
    const { isLoaded, userId } = useAuth();

    if (!isLoaded) {
        return <Spin />;
    }

    if (!userId) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};

createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
        <BrowserRouter>
            <Routes>
                <Route
                    path="/reader"
                    element={
                        <PrivateRoute>
                            <ReaderPage />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/reader" replace />} />
                <Route path="/sign-in" element={<RedirectToSignIn />} />
                <Route path="*" element={<Navigate to="/reader" replace />} />
            </Routes>
        </BrowserRouter>
    </ClerkProvider>
);
