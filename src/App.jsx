import React from "react";
import Landing from "@/pages/landing/Landing";
import { Layout } from "@/components/layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/register/Register";

function App() {
  const navigate = useNavigate();

  return (
    <Layout navigate={navigate}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
      </Routes>
    </Layout>
  );
}

export default App;
