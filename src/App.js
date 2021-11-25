import Layout from "./components/Layout";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import AddDevice from "./pages/AddDevice";
import { SnackbarStateContext } from "./components/context/SnackbarContext";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(token => { 
        axios.interceptors.request.use(config => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });
      });
    }
  }, [isAuthenticated]);

  return (
    <React.StrictMode>
      <Router>
        <SnackbarStateContext>
          <Layout>
            <Routes>
              <Route exact path="/" 
                element={
                  <RequireAuth>
                    <Devices />
                  </RequireAuth>
                } 
              />
              <Route path="/add-device-form" 
                element={
                  <RequireAuth>
                    <AddDevice />
                  </RequireAuth>
                } 
              />
              <Route exact path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </Layout>
        </SnackbarStateContext>
      </Router>
    </React.StrictMode>
  );
}
