import React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout, GuestRoute, TokenGuard } from "@/components";
import {
  ForgotPassword,
  Landing,
  Login,
  Register,
  ResetPassword,
  QuizListing,
  QuizPage,
  QuizzesLayout,
} from "@/pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/quizzes" element={<QuizzesLayout />}>
          <Route index element={<QuizListing />} />
          <Route path=":id" element={<QuizPage />} />
        </Route>

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
