import React from "react";
import Landing from "@/pages/landing/Landing";
import { Layout } from "@/components/layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "@/pages/register/Register";
import Login from "@/pages/login/Login";

function App() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
      </Routes>
    </Layout>
  );
}

export default App;
