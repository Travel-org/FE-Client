import { useParams } from "react-router-dom";
import { api } from "@src/app/api";
import { css } from "@emotion/react";
import { Avatar } from "@pages/liveSchedule";

function TravelSinglePage() {
  const { travelId } = useParams<"travelId">();

  const { data: travelData } = api.useGetTravelQuery(travelId!);
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
        asdf
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        참여자
        {travelData &&
          travelData.users.map((userData) => (
            <Avatar key={userData.userId} style={{ background: "black" }} />
          ))}
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        asdf
        {travelData?.startDate} ~ {travelData?.endDate}
      </div>
    </div>
  );
}

export default TravelSinglePage;