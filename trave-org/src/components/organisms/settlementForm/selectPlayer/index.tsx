import TextAvatar from "@src/components/atoms/textAvatar";
import { Container, ElementContainer, Wrapper, Avartar } from "./styles";

interface IUser {
  userId: number;
  userName: string;
  profilePath: null | string;
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
      {users.map(({ userId, userName, profilePath }) => (
        <ElementContainer>
          <Wrapper>
            <TextAvatar name={userName} />
            <p>{userName}</p>
          </Wrapper>
          <input
            type="radio"
            checked={payer?.userId === userId}
            onClick={() => setPayer({ userId, userName, profilePath })}
          />
        </ElementContainer>
      ))}
    </Container>
  );
};
export default SelectPayer;