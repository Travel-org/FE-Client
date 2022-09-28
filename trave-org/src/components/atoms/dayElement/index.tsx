import { Box } from "./styles";

interface ElementProps {
  date: number;
  day: number;
  status: "prev" | "this" | "today";
}
const DayElement = ({ status, date, day }: ElementProps) => {
  return (
    <>
      <Box>
        <p>{day}</p>
      </Box>
    </>
  );
};

export default DayElement;