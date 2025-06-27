import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Layout,
  GuestRoute,
  TokenGuard,
  QuizGuard,
  ToastSuccessIcon,
  ToastErrorIcon,
  ToastWarningIcon,
} from "@/components";
import {
  ForgotPassword,
  Landing,
  Login,
  Register,
  ResetPassword,
  QuizListing,
  QuizPage,
  QuizzesLayout,
  QuizSubmitPage,
} from "@/pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/quizzes" element={<QuizzesLayout />}>
            <Route index element={<QuizListing />} />
            <Route path=":id" element={<QuizPage />} />

            <Route element={<QuizGuard />}>
              <Route path=":id/submit" element={<QuizSubmitPage />} />
            </Route>
          </Route>

          <Route element={<GuestRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<TokenGuard />}>
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </Layout>

      <ToastContainer
        icon={({ type }) => {
          switch (type) {
            case "success":
              return <ToastSuccessIcon className="min-w-8 min-h-8" />;
            case "error":
              return <ToastErrorIcon className="min-w-8 min-h-8" />;
            case "warning":
              return <ToastWarningIcon className="min-w-8 min-h-8" />;
            default:
              return null;
          }
        }}
      />
    </>
  );
}

export default App;
