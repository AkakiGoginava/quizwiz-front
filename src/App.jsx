import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout, AuthRoute, GuestRoute, TokenGuard } from "@/components";
import {
  ForgotPassword,
  Landing,
  Login,
  Register,
  ResetPassword,
  Listing,
} from "@/pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quizzes" element={<Listing />} />

        <Route element={<GuestRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<TokenGuard />}>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
