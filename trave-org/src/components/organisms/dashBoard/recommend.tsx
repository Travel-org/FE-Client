import TouristSpotBoard from "@src/components/atoms/touristSpotBoard";
import { Wrapper, ScheduleContainer, TagContainer, TagButton } from "./styles";
import { useEffect, useState } from "react";

const CATEGORY = ["관광명소", "음식점", "카페", "레저/활동"];

const RecommandDashBoard = () => {
  const [category, setCategory] = useState("관광명소");

  useEffect(() => {
    //카테고리 별 추천 목록 가져오기
  }, [category]);

  return (
    <>
      <Wrapper>
        <h2>여행지 자동 추천</h2>
      </Wrapper>
      <h3>현재 여행 경로 주변의 가볼만한 곳을 자동 탐색</h3>
      <TagContainer>
        {CATEGORY.map((content) => (
          <TagButton
            status={category === content}
            onClick={() => setCategory(content)}
          >
            {content}
          </TagButton>
        ))}
      </TagContainer>
      <ScheduleContainer>
        <TouristSpotBoard />
        <TouristSpotBoard />
        <TouristSpotBoard />
        <TouristSpotBoard />
        <TouristSpotBoard />
      </ScheduleContainer>
    </>
  );
};

export default RecommandDashBoard;