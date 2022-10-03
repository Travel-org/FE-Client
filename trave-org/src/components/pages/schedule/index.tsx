import Button from "@src/components/atoms/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  ScheduleWrapper,
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
  Wrapper,
  NewScheduleBtn,
} from "./styles";

const data = { content: "충청도", people: 4, startDate: "2022-03-11" };

const ScheduleElement = ({ content, people, startDate }: typeof data) => {
  const navigate = useNavigate();
  return (
    <ScheduleElementContainer onClick={() => navigate("/liveSchedule")}>
      <Image src="https://blog.kakaocdn.net/dn/bvVHDV/btqYIk8ro2Z/EDCkAI9jXb3SMAlISvbWr0/img.jpg" />
      <Wrapper>
        <h3>{content}</h3>
        <div>
          <AvartarContainer>
            <Avartar />
            <Avartar />
            <Avartar />
            <Avartar />
          </AvartarContainer>
          <p>{startDate}</p>
        </div>
      </Wrapper>
    </ScheduleElementContainer>
  );
};
const Schedule = () => {
  return (
    <Container direction="column">
      <h2>내 여행</h2>
      <ScheduleWrapper>
        <Link to="/newSchedule">
          <NewScheduleBtn>+</NewScheduleBtn>
        </Link>
        {Array.from({ length: 4 }, () => data).map((e) => (
          <ScheduleElement {...data} />
        ))}
      </ScheduleWrapper>
    </Container>
  );
};
export default Schedule;