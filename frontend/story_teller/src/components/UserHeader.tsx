import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const UserHeader: React.FC = () => (
    <div style={{ marginBottom: "1em" }}>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>
);

export default UserHeader;
