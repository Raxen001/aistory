import { GoogleLogin } from "@react-oauth/google";

export default function SignInBtn() {
    return (
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </>
    );
}
