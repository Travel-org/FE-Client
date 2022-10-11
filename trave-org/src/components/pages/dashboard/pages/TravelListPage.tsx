import { api } from "@src/app/api";
import { NavLink } from "react-router-dom";
import { ScheduleElement } from "@organisms/scheduleElement";
import { css } from "@emotion/react";

function TravelListPage() {
  const { data: travelsData } = api.useGetTravelsQuery();

  const [createTravel] = api.useCreateTravelMutation();

  return (
    <div>
      <button
        onClick={() =>
          createTravel({
            title: "Test Title",
            startDate: "2022-05-22",
            endDate: "2022-05-23",
            userEmails: [],
          })
        }
      >
        Create
      </button>

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
    </div>
  );
}

export default TravelListPage;