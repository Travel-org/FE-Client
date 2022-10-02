import { useState } from "react";
import DataRangeBar from "@atoms/dataRangebar";
import Calender from "@organisms/calender";

interface Props {
  selectedDate: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date[]>>;
}

const SelectDate = ({ selectedDate, setSelectedDate }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChangeMonth = (number: number) =>
    setDate(new Date(date.getFullYear(), date.getMonth() + number));

  const handleSelectDate = (day: Date) =>
    setSelectedDate(
      selectedDate.length < 2
        ? [...selectedDate, day]
        : [...selectedDate.slice(1), day]
    );

  return (
    <>
      <h2>언제 여행을 떠나시나요?</h2>
      <DataRangeBar
        selectedDate={selectedDate}
        onClick={() => setIsSelected(!isSelected)}
      />
      {isSelected && (
        <Calender
          date={date}
          selectedDate={selectedDate}
          handleChangeMonth={handleChangeMonth}
          handleSelectDate={handleSelectDate}
        />
      )}
    </>
  );
};
export default SelectDate;