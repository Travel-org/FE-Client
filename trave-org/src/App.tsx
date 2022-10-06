import { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteObject,
  Routes,
  Outlet,
  useRoutes,
} from "react-router-dom";
import { ThemeProvider, Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "@styles/theme";
import reset from "@styles/global";
import PrivateRoute from "@routes/private";
import PublicRoute from "@routes/public";
import AdminRoute from "@routes/admin";

import Spinner from "@atoms/spinner";
import {
  MYPAGE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
  ADMIN_URL,
  KAKAO_CALLBACK_URL,

} from "@constants/index";




import OAuth2RedirectHandler from "@routes/oauth";

import dashboardRoute from "@pages/dashboard";

import Navigation from "./components/organisms/navigation";

import Invite from "./components/pages/invite";

const Main = lazy(() => import("@pages/landingPage"));
const SignIn = lazy(() => import("@pages/signIn"));
const SignUp = lazy(() => import("@pages/signUp"));
const Admin = lazy(() => import("@pages/admin"));
const Schedule = lazy(() => import("@pages/schedule"));
const NewSchedule = lazy(() => import("@pages/newSchedule"));
const Settlement = lazy(() => import("@pages/settlement"));
const LiveSchedule = lazy(() => import("@pages/liveSchedule"));
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

  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <PublicRoute>
          <>
            <Navigation user={user} />
            <Outlet />
          </>
        </PublicRoute>
      ),
      children: [
        {
          index: true,
          element: <Main setUser={setUser} />,
        },
        {
          path: KAKAO_CALLBACK_URL,
          element: <OAuth2RedirectHandler />,
        },
        {
          path: SIGNIN_URL,
          element: <SignIn />,
        },
        {
          path: SIGNUP_URL,
          element: <SignUp />,
        },
        {
          path: "schedule",
          element: (
            <PrivateRoute user={user}>
              <Schedule />
            </PrivateRoute>
          ),
        },
        {
          path: "settlement",
          element: (
            <PrivateRoute user={user}>
              <Settlement />
            </PrivateRoute>
          ),
        },
        {
          path: "newSchedule",
          element: (
            <PrivateRoute user={user}>
              <NewSchedule />
            </PrivateRoute>
          ),
        },
        {
          path: "liveSchedule",
          element: (
            <PrivateRoute user={user}>
              <LiveSchedule />
            </PrivateRoute>
          ),
        },
        {
          path: "temp",
          element: <Temp />,
        },
        {
          path: "/invite/accept/:id",
          element: <Invite />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <Outlet />

        </AdminRoute>
      ),
    },
    dashboardRoute,
  ];
  
  const element = useRoutes(routes);

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
        <Suspense fallback={<Spinner />}>{element}</Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;