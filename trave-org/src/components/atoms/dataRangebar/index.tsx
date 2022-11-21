import { Container } from "./styles";

interface Props {
  onClick: () => void;
  selectedDate: Date[];
}

const DataRangeBar = ({ onClick, selectedDate }: Props) => {
  const [start, end] = [...selectedDate].sort((a, b) =>
    a.getTime() > b.getTime() ? 1 : -1
  );

  const getFullDate = (date: Date) =>
    `${date.getFullYear()} - ${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    } - ${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
  return (
    <Container onClick={onClick}>
      <p>{getFullDate(start)}</p>
      <p>{"->"}</p>
      {end !== undefined ? (
        <p>{getFullDate(end)}</p>
      ) : (
        <p>{getFullDate(start)}</p>
      )}
    </Container>
  );
};

export default DataRangeBar;