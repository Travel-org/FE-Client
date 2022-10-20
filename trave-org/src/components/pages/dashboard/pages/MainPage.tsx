import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiPlus, BiTrip, BiWorld } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@pages/liveSchedule";
import travelApi from "@src/app/api/travelApi";
import ScheduleElement from "@organisms/scheduleElement";

const PopularPlace = ({
  title,
  address,
}: {
  title: string;
  address: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid black;
        gap: 10px;
      `}
    >
      <img
        css={css`
          width: 50px;
          height: 50px;
          border-radius: 5px;
        `}
        src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=a4027925-8ca4-4b7b-aead-826c9a1fbddc"
      />
      <div>
        <div
          css={css`
            font-size: 18px;
            font-weight: 500;
          `}
        >
          {title}
        </div>
        <div
          css={css`
            font-size: 12px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.79);
          `}
        >
          {address}
        </div>
      </div>
    </div>
  );
};
const MainPage = () => {
  const navigate = useNavigate();

  const { data: travelsData } = travelApi.useGetTravelsQuery();
  return (
    <div
      css={css`
        padding: 24px;
        display: flex;
        gap: 24px;
        flex-direction: column;
      `}
    >
      <div
        css={css`
        display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          `}
        >
          <div
            css={css`
              font-size: 24px;
              font-weight: 700;
            `}
          >
            다가오는 여행
          </div>

          <button>
            <BiPlus />
            여행 생성하기
          </button>
        </div>

        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
          `}
        >
          {travelsData?.content !== undefined &&
            travelsData?.content.map(
              ({ id, title, users, startDate, endDate }) => (
                <div onClick={() => navigate(id.toString())}>
                  <ScheduleElement
                    title={title}
                    users={users}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              )
            )}
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          `}
        >
          <div
            css={css`
              font-size: 24px;
              font-weight: 700;
            `}
          >
            추천 여행지
          </div>
        </div>
        <PopularPlace title="퍼플교" address="전남 신안군" />
        <PopularPlace title="흰여울문화마을" address="부산 영도구" />
        <PopularPlace title="익선동" address="서울 종로구" />
        <PopularPlace title="남이섬" address="강원 춘천시" />
        <PopularPlace title="청풍호반케이블카" address="충북 제천시" />
        <PopularPlace title="익산 미륵사지" address="전북 익산시" />
        <PopularPlace title="광명동굴" address="경기 광명시" />
        <PopularPlace title="울주 반구대 암각화" address="울산 울주군" />
        <PopularPlace title="부산 송도해수욕장" address="부산 서구" />
        <PopularPlace title="창덕궁과 후원" address="서울 종로구" />
      </div>
    </div>
  );
};