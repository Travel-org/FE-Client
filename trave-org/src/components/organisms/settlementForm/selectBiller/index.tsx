import { useEffect } from "react";
import { Container, ElementContainer, Wrapper, Avartar } from "./styles";

interface IUser {
  userId: number;
  userName: string;
  profilePath: null | string;
}

interface Props {
  payer: IUser | null;
  users: IUser[];
  selectedUser: any;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
}

const SelectBiller = ({
  payer,
  users,
  selectedUser,
  setSelectedUser,
}: Props) => {
  useEffect(() => {
    setSelectedUser({
      ...users.reduce((r, { userId }) => {
        r[userId] = false;
        return r;
      }, {}),
      [payer?.userId as number]: true,
    });
  }, []);

  return (
    <Container>
      <h2>결제자</h2>
      <Wrapper>
        <Avartar />
        {payer !== null && <p>{payer.userName}</p>}
      </Wrapper>
      <h2>청구자를 선택해주세요!</h2>
      {users
        .filter((user) => JSON.stringify(user) !== JSON.stringify(payer))
        .map(({ userId, userName }) => (
          <ElementContainer>
            <Wrapper>
              <Avartar />
              <p>{userName}</p>
            </Wrapper>
            <input
              type="checkbox"
              checked={selectedUser[userId]}
              onClick={() =>
                setSelectedUser({
                  ...selectedUser,
                  [userId]: !selectedUser[userId],
                })
              }
            />
          </ElementContainer>
        ))}
    </Container>
  );
};

export default SelectBiller;