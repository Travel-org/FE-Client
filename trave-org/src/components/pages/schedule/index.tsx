import Button from "@src/components/atoms/button";
import { Link } from "react-router-dom";
import { Container, ScheduleWrapper, ScheduleElementContainer } from "./styles";

const data = { address: "충청도", people: 4 };

const ScheduleElement = ({ address, people }: typeof data) => {
  return (
    <ScheduleElementContainer>
      <p>장소 : {address}</p>
      <p>인원 : {people}</p>
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