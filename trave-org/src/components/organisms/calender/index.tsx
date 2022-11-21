import { CalenderNav, Wrapper } from "./styles";
import { DAY } from "@constants/index";
import { handleCompareDate } from "@utils/index";
import DayElement from "@atoms/dayElement";

interface Props {
  date: Date;
  selectedDate: Date[];
  handleChangeMonth: (condition: number) => void;
  handleSelectDate: (day: Date) => void;
}

const getDate = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDate = start.getDate();
  const startDay = start.getDay();
  const endDate = end.getDate();
  const thisDates = [...Array(endDate + 1).keys()]
    .slice(1)
    .map((d) => new Date(end.getFullYear(), end.getMonth(), d));

  const prevDates =
    startDay !== 6
      ? Array.from({ length: startDay + 1 })
          .map(
            (e, i) =>
              new Date(start.getFullYear(), start.getMonth(), startDate - i)
          )
          .reverse()
      : [];
  return { thisDates, prevDates };
};

const Calender = ({
  date,
  selectedDate,
  handleChangeMonth,
  handleSelectDate,
}: Props) => {
  const title = date.getFullYear() + "년" + " " + (date.getMonth() + 1) + "월";
  const { thisDates, prevDates } = getDate(date);
  const handleUp = () => handleChangeMonth(1);
  const handleDown = () => handleChangeMonth(-1);

  const handleCheckSleleted = (element: Date) => {
    const [first, second] = [...selectedDate].sort((a, b) =>
      a.getTime() > b.getTime() ? 1 : -1
    );
    return (
      !!(selectedDate.length === 1 && handleCompareDate(first, element)) ||
      (selectedDate.length == 2 && first <= element && element <= second) ||
      (selectedDate.length == 2 && first >= element && element >= second)
    );
  };

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
        {DAY.map((day) => (
          <p key={day}>{day}</p>
        ))}
        {[...prevDates, ...thisDates].map((element, index) => (
          <DayElement
            status={handleCheckSleleted(element) ? "mid" : "none"}
            onClick={handleSelectDate}
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