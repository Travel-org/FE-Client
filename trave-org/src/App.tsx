import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, Global, css } from "@emotion/react";
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
import OAuth2RedirectHandler from "@routes/oauth";
import Navigation from "./components/organisms/navigation";
import Invite from "./components/pages/invite";
const MyPage = lazy(() => import("@pages/myPage"));
const Main = lazy(() => import("@pages/landingPage"));
const SignIn = lazy(() => import("@pages/signIn"));
const SignUp = lazy(() => import("@pages/signUp"));
const Admin = lazy(() => import("@pages/admin"));
const Schedule = lazy(() => import("@pages/schedule"));
const NewSchedule = lazy(() => import("@pages/newSchedule"));
const Settlement = lazy(() => import("@pages/settlement"));
const LiveSchedule = lazy(() => import("@pages/liveSchedule"));
const Search = lazy(() => import("@pages/search"));
const Temp = lazy(() => import("@pages/temp"));

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(false);
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <Global
        styles={css`
          * {
            font-family: "Spoqa Han Sans Neo", "Spoqa Han Sans JP", sans-serif;
          }
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            background: #fcfcfd;
          }
        `}
      />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Router>
            <Routes>
            <Route
                path={MAIN_URL}
                element={
                  <PublicRoute>
                    <>
                      <Navigation user={user} />
                      <Main setUser={setUser} />
                    </>
                  </PublicRoute>
                }
              />
              <Route
                path={KAKAO_CALLBACK_URL}
                element={<OAuth2RedirectHandler />}
              />
              <Route
                path={MYPAGE_URL}
                element={
                  <PrivateRoute user={user}>
                    <MyPage />
                  </PrivateRoute>
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
                path="/schedule"
                element={
                  <PrivateRoute user={user}>
                    <Schedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settlement"
                element={
                  <PrivateRoute user={user}>
                    <Settlement />
                  </PrivateRoute>
                }
              />
              <Route
                path="/newSchedule"
                element={
                  <PrivateRoute user={user}>
                    <NewSchedule />
                  </PrivateRoute>
                }
              />
              <Route
                path="/liveSchedule"
                element={
                  <PrivateRoute user={user}>
                    <LiveSchedule />
                  </PrivateRoute>
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
                path="/temp"
                element={
                  <PublicRoute>
                    <Temp />
                  </PublicRoute>
                }
              />
              <Route
                path="/invite/accept/:id"
                element={
                  <PublicRoute>
                    <Invite />
                  </PublicRoute>
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