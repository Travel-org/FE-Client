import { Container, ElementContainer, Wrapper, Avartar } from "./styles";

interface IUser {
  userId: number;
  userName: string;
}

interface Props {
  users: IUser[];
  payer: IUser | null;
  setPayer: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const SelectPayer = ({ payer, setPayer, users }: Props) => {
  return (
    <Container>
      <h2>결제자를 선택해주세요!</h2>
      {users.map(({ userId, userName }) => (
        <ElementContainer>
          <Wrapper>
            <Avartar />
            <p>{userName}</p>
          </Wrapper>
          <input
            type="radio"
            checked={
              JSON.stringify(payer) === JSON.stringify({ userId, userName })
            }
            onClick={() => setPayer({ userId, userName })}
          />
        </ElementContainer>
      ))}
    </Container>
  );
};
export default SelectPayer;