import Button from "@src/components/atoms/button";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@src/app/api";
import { useEffect } from "react";
import {
  Container,
  ScheduleWrapper,
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
} from "./styles";

const data = { content: "충청도", people: 4 };

function ScheduleElement({ content, people }: typeof data) {
  const navigate = useNavigate();
  return (
    <ScheduleElementContainer onClick={() => navigate("/liveSchedule")}>
      <Image src="https://blog.kakaocdn.net/dn/bvVHDV/btqYIk8ro2Z/EDCkAI9jXb3SMAlISvbWr0/img.jpg" />
      <p>제목 : {content}</p>
      <AvartarContainer>
        <Avartar />
        <Avartar />
        <Avartar />
        <Avartar />
      </AvartarContainer>
    </ScheduleElementContainer>
  );
}

function Schedule() {
  const { data: data2 } = api.useGetMyInfoQuery();

  useEffect(() => {
    console.log(data2);
  }, [data2]);

  return (
    <Container direction="column">
      <h2>내 여행</h2>
      <ScheduleWrapper>
        {Array.from({ length: 20 }, () => data).map((e) => (
          <ScheduleElement {...data} />
        ))}
      </ScheduleWrapper>
      <Link to="/newSchedule">
        <Button>새여행 계획하기</Button>
      </Link>
    </Container>
  );
}

export default Schedule;