import Layout from "./components/Layout";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import AddDevice from "./pages/AddDevice";
import { SnackbarStateContext } from "./components/context/SnackbarContext";

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <SnackbarStateContext>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Devices />}></Route>
              <Route path="/add-device-form" element={<AddDevice />}></Route>
            </Routes>
          </Layout>
        </SnackbarStateContext>
      </Router>
    </React.StrictMode>
  );
}
