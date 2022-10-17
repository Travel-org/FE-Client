import { useState } from "react";
import DataRangeBar from "@atoms/dataRangebar";
import Calendar from "react-calendar";

interface Props {
  dateRange: any;
  setDateRange: React.Dispatch<React.SetStateAction<any>>;
}

const SelectDate = ({ dateRange, setDateRange }: Props) => {
  const [isSelected, setIsSelected] = useState(false);
  const formatDate = (date: Date) => {
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    const year = date.getFullYear();
    if (month.length < 2) {
      month = `0${month}`;
    }
    if (day.length < 2) {
      day = `0${day}`;
    }
    return [year, month, day].join("-");
  };

  return (
    <>
      <h2>언제 여행을 떠나시나요?</h2>
      <DataRangeBar
        selectedDate={dateRange}
        onClick={() => setIsSelected(!isSelected)}
      />
      {isSelected && (
        <Calendar
          selectRange
          returnValue={"range"}
          value={dateRange}
          onChange={(v) => setDateRange(v)}
        />
      )}
    </>
  );
};
export default SelectDate;