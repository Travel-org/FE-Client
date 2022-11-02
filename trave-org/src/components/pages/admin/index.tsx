import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useMatch,
  useNavigate,
} from "react-router-dom";
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
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import { api } from "@src/app/api/api";
import travelApi from "@src/app/api/travelApi";
import TextAvatar from "@src/components/atoms/textAvatar";
import AdminRoute from "@src/routes/admin";
import Admin from "./pages/Admin";
import Travel from "./pages/Travel";
import Post from "./pages/Post";
import Schedule from "./pages/Schedule";
import User from "./pages/User";
import Notice from "./pages/Notice";
import Event from "./pages/Event";
import Cost from "./pages/Cost";

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
const SideBarMenu = ({
  toPath,
  children,
}: {
  toPath: string;
  children: any;
}) => {
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
};
const SideBar = () => {
  return (
    <div
      css={css`
        background: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        // FIXME : Is there better way?
        width: 250px;
        min-width: 250px;
      `}
    >
      <a
        css={css`
          padding: 24px;
        `}
        href="/dashboard"
      >
        <Logo color="#1e52e2" />
      </a>

      <div
        css={css`
          width: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-content: stretch;
        `}
      >
        <SideBarMenu toPath="/admin">
          <BiHomeAlt size={24} style={{ marginRight: 12 }} />홈
        </SideBarMenu>
        <SideBarMenu toPath="/admin/travels">
          <BiMapAlt size={24} style={{ marginRight: 12 }} />
          여행
        </SideBarMenu>
        <SideBarMenu toPath="/admin/users">
          <BiUserCircle size={24} style={{ marginRight: 12 }} />
          사용자
        </SideBarMenu>
        <SideBarMenu toPath="/admin/posts">
          <BiGridAlt size={24} style={{ marginRight: 12 }} />
          피드
        </SideBarMenu>
        <SideBarMenu toPath="/admin/schedules">
          <BiGridAlt size={24} style={{ marginRight: 12 }} />
          일정
        </SideBarMenu>
        <SideBarMenu toPath="/admin/costs">
          <BiGridAlt size={24} style={{ marginRight: 12 }} />
          정산
        </SideBarMenu>
        <SideBarMenu toPath="/admin/notice">
          <BiBookAlt size={24} style={{ marginRight: 12 }} />
          공지사항
        </SideBarMenu>
        <SideBarMenu toPath="/admin/event">
          <BiBell size={24} style={{ marginRight: 12 }} />
          이벤트
        </SideBarMenu>
      </div>
    </div>
  );
};
const TravelNameBreadCrumb = ({ match }) => {
  const { data: travelData } = travelApi.useGetTravelQuery(
    match.params.travelId
  );
  return (
    <span>{travelData ? `${travelData.id}-${travelData.title}` : "..."}</span>
  );
};
const TopBar = () => {
  const { data: myInfoData } = api.useGetMyInfoQuery();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs(adminRouter, { disableDefaults: true });
  return (
    <>
      <div>
        <span
          css={css`
            font-weight: 500;
            font-size: 24px;
          `}
        >
          메인
        </span>
        <div>
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.pathname}>
              <NavLink to={match.pathname}>{breadcrumb} / </NavLink>
            </span>
          ))}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          :hover {
            opacity: 50%;
          }
        `}
      >
        <div onClick={() => navigate("/mypage")}>
          <TextAvatar name={myInfoData?.name ?? "게스트"} />
        </div>
      </div>
    </>
  );
};
const AdminTemplate = () => {
  return (
    <div
      css={css`
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
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <TopBar />
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
};
const adminRouter: BreadcrumbsRoute<string>[] = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminTemplate />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "/admin/travels",
        element: <Travel />,
      },
      {
        path: "/admin/posts",
        element: <Post />,
      },
      {
        path: "/admin/users",
        element: <User />,
      },
      {
        path: "/admin/schedules",
        element: <Schedule />,
      },
      {
        path: "/admin/costs",
        element: <Cost />,
      },
      {
        path: "/admin/notice",
        element: <Notice />,
      },
      {
        path: "/admin/event",
        element: <Event />,
      },
    ],
  },
];
export default adminRouter;