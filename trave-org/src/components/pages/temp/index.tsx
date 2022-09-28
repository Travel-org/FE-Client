import { useRef } from "react";
import Calender from "@organisms/calender";
import { useState } from "react";
const Temp = () => {
  //   const canvasRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const handleChangeMonth = (number: number) =>
    setDate(new Date(date.getFullYear(), date.getMonth() + number));

  return <Calender date={date} handleChangeMonth={handleChangeMonth} />;
};

export default Temp;
