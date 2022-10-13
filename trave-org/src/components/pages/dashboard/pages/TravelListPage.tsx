import { api } from "@src/app/api";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ScheduleElement } from "@organisms/scheduleElement";
import { css } from "@emotion/react";
import Modal from "@src/components/modal";

const TravelListPage = () => {
  const { data: travelsData } = api.useGetTravelsQuery();

  return (
    <div>
      <Link to="add">생성하기</Link>

      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        `}
      >
        {travelsData?.content !== undefined &&
          travelsData?.content.map(
            ({ id, title, startDate, users, endDate }) => (
              <NavLink to={id.toString()}>
                <div>
                  <ScheduleElement
                    title={title}
                    users={users}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              </NavLink>
            )
          )}
      </div>
      <Outlet />
    </div>
  );
};

export default TravelListPage;