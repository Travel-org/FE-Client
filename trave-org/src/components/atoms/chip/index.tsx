import { Container } from "./styles";

interface ChipProps {
  num: number;
  status: boolean;
  content: string;
}

const Chip = ({ num, status, content }: ChipProps) => {
  return (
    <Container status={status}>
      {status ? (
        <div />
      ) : (
        <div>
          <p>{num + 1}</p>
        </div>
      )}
      <p>{content}</p>
    </Container>
  );
};

export default Chip;