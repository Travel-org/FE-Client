import { useEffect, useRef } from "react";
import Calender from "@organisms/calender";
import { handleCompareDate } from "@utils/index";
import { useState } from "react";

const Temp = () => {
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [date, setDate] = useState(new Date());
  const handleChangeMonth = (number: number) =>
    setDate(new Date(date.getFullYear(), date.getMonth() + number));

  const handleSelectDate = (day: Date) => {
    if (selectedDate.some((e) => handleCompareDate(e, day))) {
      setSelectedDate(selectedDate.filter((e) => !handleCompareDate(e, day)));
    } else {
      setSelectedDate(
        selectedDate.length < 2
          ? [...selectedDate, day]
          : [...selectedDate.slice(1), day]
      );
    }
  };

  return (
    <Calender
      date={date}
      selectedDate={selectedDate}
      handleChangeMonth={handleChangeMonth}
      handleSelectDate={handleSelectDate}
    />
  );
};

export default Temp;