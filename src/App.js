import Layout from "./components/Layout";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import RequireAuth from "./RequireAuth";
import Unauthorized from "./pages/Unauthorized";

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" 
              element={
                <RequireAuth>
                  <Devices />
                </RequireAuth>
              } 
            />
            <Route exact path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Layout>
      </Router>
    </React.StrictMode>
  );
}
