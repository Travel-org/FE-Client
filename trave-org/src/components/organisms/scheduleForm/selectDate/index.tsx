import { useState } from "react";
import DataRangeBar from "@atoms/dataRangebar";
import Calender from "@organisms/calender";
import { handleCompareDate } from "@utils/index";

const SelectDate = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date[]>([new Date()]);
  const [date, setDate] = useState(new Date());

  const handleChangeMonth = (number: number) =>
    setDate(new Date(date.getFullYear(), date.getMonth() + number));

  const handleSelectDate = (day: Date) => {
    if (selectedDate.some((e) => handleCompareDate(e, day))) {
      setSelectedDate(selectedDate.filter((e) => !handleCompareDate(e, day)));
    } else {
      setSelectedDate(
        selectedDate.length < 2
          ? [...selectedDate, day].sort()
          : [...selectedDate.slice(1), day].sort()
      );
    }
  };
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