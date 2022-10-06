import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiTrip, BiWorld } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@pages/liveSchedule";
import { api } from "@src/app/api";

function MainPage() {
  const navigate = useNavigate();

  const { data: travelsData } = api.useGetTravelsQuery();
  return (
    <div
      css={css`
        padding: 24px;
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(4, 1fr);
      `}
    >
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        <div>여행 A</div>

        <div>2022-05-20 ~ 2022-05-23</div>
      </div>

      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        <div>여행 B</div>

        <div>2022-05-20 ~ 2022-05-23</div>
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        <div>여행 C</div>

        <div>2022-05-20 ~ 2022-05-23</div>
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        asdf
      </div>
    </div>
  );
}

export default MainPage;