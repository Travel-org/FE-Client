import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  useMatch,
  useNavigate,
} from "react-router-dom";
import TravelListPage from "@pages/dashboard/pages/TravelListPage";
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
import { Avatar } from "@pages/liveSchedule";
import styled from "@emotion/styled";
import FriendsPage from "@pages/dashboard/pages/FriendsPage";
import MainPage from "@pages/dashboard/pages/MainPage";
import useBreadcrumbs, { BreadcrumbsRoute } from "use-react-router-breadcrumbs";
import { api } from "@src/app/api/api";
import FeedPage from "@pages/dashboard/pages/FeedPage";
import EventPage from "@pages/dashboard/pages/EventPage";
import NoticePage from "@pages/dashboard/pages/NoticePage";
import TravelEditPage from "@pages/dashboard/pages/TravelEditPage";
import Modal from "@src/components/modal";
import CreateTravelModal from "@pages/dashboard/CreateTravelModal";
import travelApi from "@src/app/api/travelApi";
import TextAvatar from "@src/components/atoms/textAvatar";
import NoticeDetail from "../admin/pages/detail/NoticeDetail";
import EventDetail from "../admin/pages/detail/EventDetail";

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
        <SideBarMenu toPath="/dashboard/notices">
          <BiBookAlt size={24} style={{ marginRight: 12 }} />
          공지사항
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/events">
          <BiBell size={24} style={{ marginRight: 12 }} />
          이벤트
        </SideBarMenu>
        <SideBarMenu toPath="/dashboard/setting">
          <BiCertification size={24} style={{ marginRight: 12 }} />
          설정
        </SideBarMenu>
        <SideBarMenu toPath="/logout">
          <BiLogOut size={24} style={{ marginRight: 12 }} />
          로그아웃
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
  const breadcrumbs = useBreadcrumbs(dashboardRoute, { disableDefaults: true });

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
          <TextAvatar name={myInfoData?.name?? "박경빈"} />
        </div>
      </div>
    </>
  );
};
const DashboardTemplate = () => {
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
            height: 8vh;
            padding: 1rem;
            box-sizing: border-box;
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

const dashboardRoute: BreadcrumbsRoute<string>[] = [
  {
    path: "dashboard",
    element: <DashboardTemplate />,
    children: [
      {
        index: true,
        element: <MainPage />,
        breadcrumb: "홈",
      },
      {
        path: "travels",
        element: <TravelListPage />,
        breadcrumb: "여행",
      },
      {
        path: "travels/:travelId",
        element: (
          // @ts-ignore
            <TravelEditPage />
        ),
        breadcrumb: TravelNameBreadCrumb,
      },
      {
        path: "friends",
        element: <FriendsPage />,
        breadcrumb: "친구",
      },
      {
        path: "feed",
        element: <FeedPage />,
        breadcrumb: "피드",
      },
      {
        path: "notices",
        element: <NoticePage />,
        breadcrumb: "공지사항",
      },
      {
        path: "notices/:noticeId",
        element: <NoticeDetail />,
        breadcrumb: "공지사항",
      },
      {
        path: "events",
        element: <EventPage />,
        breadcrumb: "이벤트",
      },
      {
        path: "events/:eventId",
        element: <EventDetail />,
        breadcrumb: "이벤트",
      },
    ],
  },
];

export default dashboardRoute;