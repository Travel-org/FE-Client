import { Container } from "./styles";

interface Props {
  content: string;
}

const ScheduleBoard = ({ content }: Props) => {
  return (
    <Container>
      <img src="/rect.png" />
      <h3>{content}</h3>
      <p>test</p>
    </Container>
  );
};

export default ScheduleBoard;