import { css } from "@emotion/react";
import { api } from "@src/app/api";
import { theme } from "@src/styles/theme";
import { Link } from "react-router-dom";

function TravelListPage() {
  const { data: travelsData } = api.useGetTravelsQuery();

  return (
    <div
      css={css`
        padding: 2rem;
      `}
    >
      <Link to="/newSchedule">
        <button
          css={css`
            border: none;
            background: none;
            border-radius: 10px;
            min-width: 20vw;
            min-height: 40vh;
            box-shadow: 0px 0px 3px ${theme.colors.shadow};
            font-size: 3rem;
            cursor: pointer;
            :hover {
              opacity: 50%;
            }
          `}
        >
          +
        </button>
      </Link>
      {travelsData &&
        travelsData.map((travelData) => (
          <div>
            <div>{travelData.title}</div>
          </div>
        ))}
    </div>
  );
}
export default TravelListPage;