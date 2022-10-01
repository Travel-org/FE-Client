import { Box } from "./styles";

interface ElementProps {
  date: number;
  day: Date;
  status: "mid" | "none" | "start" | "end";
  onClick: (day: Date) => void;
}
const DayElement = ({ status, date, day, onClick }: ElementProps) => {
  return (
    <Box status={status} onClick={() => onClick(day)}>
      <p>{day.getDate()}</p>
    </Box>
  );
};

export default DayElement;