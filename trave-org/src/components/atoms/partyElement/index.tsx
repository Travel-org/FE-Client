import { Container, Image } from "./styles";

interface Props {
  name: string;
  email: string;
}

const PartyElement = ({ name, email }: Props) => {
  return (
    <Container>
      <Image />
      <div>
        <strong>
          <p>{name}</p>
        </strong>
        <p>{email}</p>
      </div>
    </Container>
  );
};

export default PartyElement;