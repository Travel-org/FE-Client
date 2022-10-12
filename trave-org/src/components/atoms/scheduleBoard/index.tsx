import { Container } from "./styles";

interface Props {
  title: string;
  description: string;
  onClick?: () => void;
}

const ScheduleBoard = ({ title, description, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      {/* <img src="/rect.png" /> */}
      <h3>{title}</h3>
      <p>{description}</p>
    </Container>
  );
};

export default ScheduleBoard;