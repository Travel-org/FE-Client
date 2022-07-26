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
import normalize from "@styles/normalize";
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
import { Provider } from "react-redux";
import Modal from "@src/components/modal";
import Navigation from "./components/organisms/navigation";
import Invite from "./components/pages/invite";
import { store } from "./app/store";
import OauthSignUp from "./components/pages/signUp/kakao";
import adminRouter from "@pages/admin";

const Main = lazy(() => import("@pages/landingPage"));
const SignIn = lazy(() => import("@pages/signIn"));
const SignUp = lazy(() => import("@pages/signUp"));
const Settlement = lazy(() => import("@pages/settlement"));
const LiveSchedule = lazy(() => import("@pages/liveSchedule"));
const Temp = lazy(() => import("@pages/temp"));
const MyPage = lazy(() => import("@pages/myPage"));

const App = () => {
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
          element: <Main />,
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
          path: "/signUp/kakao",
          element: <OauthSignUp />,
        },
        {
          path: "settlement/:travelId",
          element: (
            <PrivateRoute user={user}>
              <Settlement />
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
        {
          path: "/mypage",
          element: (
            <PrivateRoute user={user}>
              <MyPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    ...dashboardRoute,
    ...adminRouter,
  ];

  const element = useRoutes(routes);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={normalize} />
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
    </Provider>
  );
};

export default App;