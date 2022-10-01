import { DashBaordStyle, ScheduleContainer } from "./styles";
import ScheduleBoard from "@atoms/scheduleBoard";

const DashBoard = () => {
  return (
    <DashBaordStyle>
      <div>
        <h2>어디론가 떠나는 여행</h2>
        <h1>여행 계획하기</h1>
        <ScheduleContainer>
          <ScheduleBoard />
          <ScheduleBoard />
          <ScheduleBoard />
          <ScheduleBoard />
          <ScheduleBoard />
          <ScheduleBoard />
          <ScheduleBoard />
        </ScheduleContainer>
        <div>
          <button>+ 일정 추가하기</button>
        </div>
        <p>이동거리 : 82km</p>
        <p>소요시간 : 4시간 27분</p>
      </div>
    </DashBaordStyle>
  );
};
export default DashBoard;