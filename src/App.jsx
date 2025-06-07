import React from "react";
import Landing from "@/pages/landing/Landing";
import { Layout } from "@/components/layout";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
