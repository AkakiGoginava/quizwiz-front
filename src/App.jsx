import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Layout } from "@/components/layout";
import Landing from "@/pages/landing/Landing";
import Register from "@/pages/register/Register";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/resetPassword/ResetPassword";
import ForgotPassword from "@/pages/forgotPassword/ForgotPassword";
import { AuthRoute, GuestRoute, TokenGuard } from "@/components/routes";

function App() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register navigate={navigate} />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              {" "}
              <Login navigate={navigate} />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword navigate={navigate} />{" "}
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <TokenGuard>
              <ResetPassword navigate={navigate} />
            </TokenGuard>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
