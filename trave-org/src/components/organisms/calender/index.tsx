import { CalenderNav, Wrapper } from "./styles";
import DayElement from "@atoms/dayElement";
// import CalenderDayElement from "@atoms/calenderDayElement";

interface Props {
  date: Date;
  handleChangeMonth: (condition: number) => void;
}
const Day = ["월", "화", "수", "목", "금", "토", "일"];

const getDate = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDate = start.getDate();
  const startDay = start.getDay();
  const endDate = end.getDate();
  const thisDates = [...Array(endDate + 1).keys()].slice(1);
  const prevDates =
    startDay !== 6
      ? Array(startDay + 1)
          .fill("")
          .map((element, i) => startDate - i)
          .reverse()
      : [];
  return { thisDates, prevDates };
};

const Calender = ({ date, handleChangeMonth }: Props) => {
  const today = new Date();
  const title = date.getFullYear() + "년" + " " + (date.getMonth() + 1) + "월";
  const handleCheckToday = (element: number) =>
    !!(
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === element
    );
  const { thisDates, prevDates } = getDate(date);
  const handleUp = () => handleChangeMonth(1);
  const handleDown = () => handleChangeMonth(-1);
  return (
    <>
      <CalenderNav>
        <p>{title}</p>
        <CalenderNav>
          <button onClick={handleDown}>{"<"}</button>
          <button onClick={handleUp}>{">"}</button>
        </CalenderNav>
      </CalenderNav>
      <Wrapper>
        {Day.map((element) => (
          <p key={element}>{element}</p>
        ))}
        {prevDates.map((element, index) => (
          <DayElement
            status="prev"
            key={index}
            day={element}
            date={(index + 1) % 7}
          />
        ))}
        {thisDates.map((element, index) => (
          <DayElement
            status={handleCheckToday(element) ? "today" : "this"}
            key={index}
            day={element}
            date={(index + 1) % 7}
          />
        ))}
      </Wrapper>
    </>
  );
};
export default Calender;