import { Container, Image } from "./styles";

interface Props {
  name: string;
  email: string;
}

const PartyElement = ({ email }: Props) => {
  return (
    <Container>
      <Image />
      <div>
        <p>{email}</p>
      </div>
    </Container>
  );
};

export default PartyElement;