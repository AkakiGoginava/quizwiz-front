import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Layout } from "@/components/layout";
import Landing from "@/pages/landing/Landing";
import Register from "@/pages/register/Register";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";

function App() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword navigate={navigate} />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword navigate={navigate} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
