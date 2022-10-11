import { api } from "@src/app/api";
import { NavLink } from "react-router-dom";
import { ScheduleElement } from "@pages/schedule";
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
        {travelsData &&
          travelsData.data.map((travelData) => (
            <NavLink to={travelData.id.toString()}>
              <div>
                <ScheduleElement
                  content={travelData.title}
                  people={travelData.users}
                  startDate={travelData.startDate}
                  endDate={travelData.endDate}
                />
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default TravelListPage;