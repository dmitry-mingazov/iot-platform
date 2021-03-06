import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthStateContext } from "./components/context/AuthContext";
import { NodeRedStateContext } from "./components/context/NodeRedContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8f0000",
    },
  },
  typography: {
    fontFamily: ["Nunito"].join(","),
  },
});

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
  >
    <AuthStateContext>
      <NodeRedStateContext>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </NodeRedStateContext>
    </AuthStateContext>
  </Auth0Provider>,
  document.getElementById("root")
);
