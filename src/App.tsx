import { AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import HomePage from './components/home-page';
import LoginPage from './components/login-page';

import { MsalProvider } from "@azure/msal-react";
import { Configuration,  PublicClientApplication } from "@azure/msal-browser";

function App() {

  const isAuthenticated = useIsAuthenticated();

  // MSAL configuration
  const configuration: Configuration = {
      auth: {
          clientId: "0f220cb8-bc0b-41f1-b3e7-ea136118365e",
          authority: "https://login.microsoftonline.com/a751704a-5b8b-4f54-8fb2-2a5c7fc1e759",
          redirectUri:"http://localhost:3000"
      }
  };

  const pca = new PublicClientApplication(configuration);

  return (<>
    <MsalProvider instance={pca}>
      <div>
        <UnauthenticatedTemplate>
          <LoginPage />
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <HomePage />
        </AuthenticatedTemplate>
      </div>
    </MsalProvider>
  </>);
}

export default App;
