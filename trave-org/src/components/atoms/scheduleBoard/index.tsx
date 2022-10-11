import { Container } from "./styles";

interface Props {
  title: string;
  description: string;
}

const ScheduleBoard = ({ title, description }: Props) => {
  return (
    <Container>
      {/* <img src="/rect.png" /> */}
      <h3>{title}</h3>
      <p>{description}</p>
    </Container>
  );
};

export default ScheduleBoard;