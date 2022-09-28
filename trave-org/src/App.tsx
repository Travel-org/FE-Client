import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "@routes/private";
import PublicRoute from "@routes/public";
import AdminRoute from "@routes/admin";

import Spinner from "@atoms/spinner";
import {
  MAIN_URL,
  MYPAGE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  ADMIN_URL,
} from "@constants/index";

const MyPage = lazy(() => import("@pages/myPage"));
const Main = lazy(() => import("@pages/main"));
const SignIn = lazy(() => import("@pages/signIn"));
const SignUp = lazy(() => import("@pages/signUp"));
const Admin = lazy(() => import("@pages/admin"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          <Route
            path={MYPAGE_URL}
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path={MAIN_URL}
            element={
              <PublicRoute>
                <Main />
              </PublicRoute>
            }
          />
          <Route
            path={SIGNIN_URL}
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path={SIGNUP_URL}
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path={ADMIN_URL}
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;