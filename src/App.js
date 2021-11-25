import Layout from "./components/Layout";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import AddDevice from "./pages/AddDevice";
import { SnackbarStateContext } from "./components/context/SnackbarContext";

export default function App() {
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
