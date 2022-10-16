import { css } from "@emotion/react";
import { Logo } from "@src/components/logo";
import { Link, useNavigate } from "react-router-dom";
import { BiHomeAlt, BiTrip, BiWorld } from "react-icons/bi";
import { Avatar, AvatarGroup } from "@pages/liveSchedule";
import { api } from "@src/app/api/api";

function PopularPlace({ title, address }: { title: string; address: string }) {
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
}
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
          padding: 10px;
        `}
      >
        <div
          css={css`
            font-size: 20px;
            font-weight: 600;
          `}
        >
          인기 여행지
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
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
    </div>
  );
}
export default MainPage;