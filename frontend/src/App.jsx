import './App.css'
import { SignedIn, SignedOut, SignInButton ,RedirectToSignIn, SignOutButton } from '@clerk/clerk-react';
import GridContainerLayout from './components/container/gridContainerLayout';


function App() {
  return(
    <>
      <SignedOut>
        {/* todo : need to change this to sign in button after landing page is started*/}
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
          <GridContainerLayout/>
      </SignedIn>
    </>
  )
}

export default App
