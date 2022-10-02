import Button from "@src/components/atoms/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  ScheduleWrapper,
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
} from "./styles";

const data = { content: "충청도", people: 4 };

const ScheduleElement = ({ content, people }: typeof data) => {
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
};
const Schedule = () => {
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
};
export default Schedule;