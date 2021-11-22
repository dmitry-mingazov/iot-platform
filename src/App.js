import Layout from "./components/Layout";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import AddDevice from "./pages/AddDevice";

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Devices />}></Route>
            <Route path="/add-device-form" element={<AddDevice/>}></Route>
          </Routes>
        </Layout>
      </Router>
    </React.StrictMode>
  );
}
