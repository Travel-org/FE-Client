import { Link, Outlet, RouteObject, useMatch } from "react-router-dom";
import TravelListPage from "@pages/dashboard/TravelListPage";
import TravelSinglePage from "@pages/dashboard/TravelSinglePage";
import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import {
  BiBell,
  BiBookAlt,
  BiCertification,
  BiGridAlt,
  BiHomeAlt,
  BiLogOut,
  BiMapAlt,
  BiUserCircle,
} from "react-icons/bi";
import { motion, useAnimation } from "framer-motion";
import { Avatar } from "@pages/liveSchedule";
import styled from "@emotion/styled";
import FriendsPage from "@pages/dashboard/FriendsPage";
import MainPage from "@pages/dashboard/MainPage";

const LLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function SideBarMenu({ toPath, children }: { toPath: string; children: any }) {
  const isMatch = useMatch(toPath);

  return (
    <LLink to={toPath}>
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          margin: 7px 0;
          gap: 10px;
        `}
        style={{ color: isMatch ? "#1e52e2" : "rgba(0, 0, 0, 0.4)" }}
      >
        {isMatch && (
          <motion.div
            css={css`
              position: absolute;
              width: 5px;
              height: 100%;
              border-radius: 0 10px 10px 0;
              background: #1e52e2;
            `}
            layoutId="outline"
            initial={false}
          />
        )}
        <div
          css={css`
            padding: 10px 24px;
            z-index: 1000;
            display: flex;
            align-items: center;
            font-weight: 600;
          `}
        >
          {children}
        </div>
      </div>
    </LLink>
  );
}

function SideBar() {
  return (
    <div
      css={css`
        background: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        width: 250px;
      `}
    >
      <div
        css={css`
          padding: 24px;
        `}
      >
        <Logo color="#1e52e2" />
      </div>

      <div
        css={css`
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-content: stretch;
        `}
      >
        <SideBarMenu toPath="/dashboard">
          <BiHomeAlt size={24} style={{ marginRight: 12 }} />홈
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/travels">
          <BiMapAlt size={24} style={{ marginRight: 12 }} />내 여행
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/friends">
          <BiUserCircle size={24} style={{ marginRight: 12 }} />
          친구
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/feed">
          <BiGridAlt size={24} style={{ marginRight: 12 }} />
          피드
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/notification">
          <BiBookAlt size={24} style={{ marginRight: 12 }} />
          공지사항
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/event">
          <BiBell size={24} style={{ marginRight: 12 }} />
          이벤트
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/setting">
          <BiCertification size={24} style={{ marginRight: 12 }} />
          설정
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/setting">
          <BiLogOut size={24} style={{ marginRight: 12 }} />
          로그아웃
        </SideBarMenu>
      </div>
    </div>
  );
}
function DashboardTemplate() {
  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
      `}
    >
      <SideBar />
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <span>Title</span>

          <Avatar
            css={css`
              background: red;
            `}
          />
        </div>
        <div
          css={css`
            background: rgba(244, 244, 244);
            flex-grow: 1;
          `}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const dashboardRoute: RouteObject = {
  path: "dashboard",
  element: <DashboardTemplate />,
  children: [
    {
      index: true,
      element: <MainPage />,
    },
    {
      path: "travels",
      element: <TravelListPage />,
    },
    {
      path: "travels/:id",
      element: <TravelSinglePage />,
    },
    {
      path: "friends",
      element: <FriendsPage />,
    },
  ],
};

export default dashboardRoute;