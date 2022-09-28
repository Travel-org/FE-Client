import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "@styles/theme";
import reset from "@styles/global";
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
  KAKAO_CALLBACK_URL,
} from "@constants/index";

import Navigation from "./components/organisms/navigation";
import OAuth2RedirectHandler from "@routes/oauth";

const MyPage = lazy(() => import("@pages/myPage"));
const Main = lazy(() => import("@pages/main"));
const SignIn = lazy(() => import("@pages/signIn"));
const SignUp = lazy(() => import("@pages/signUp"));
const Admin = lazy(() => import("@pages/admin"));
const Temp = lazy(() => import("@pages/temp"));

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Router>
            <Navigation />
            <div style={{ marginTop: "8vh" }} />
            <Routes>
              <Route
                path={KAKAO_CALLBACK_URL}
                element={<OAuth2RedirectHandler />}
              />
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
              <Route
                path={"/temp"}
                element={
                  <AdminRoute>
                    <Temp />
                  </AdminRoute>
                }
              />
            </Routes>
          </Router>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;