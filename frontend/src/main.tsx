import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ClerkProvider, RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import ReaderPage from "./pages/ReaderPage";
import { Spin, ConfigProvider } from 'antd';
import "./index.css";

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
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    borderRadius: 2,
                    colorBgContainer: '#f6ffed',
                },
                components: {
                    Layout: {
                        triggerBg: "#f0f0f0",
                        triggerColor: "#000"
                    }
                }
            }}
        >
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
        </ConfigProvider>
    </ClerkProvider>
);
