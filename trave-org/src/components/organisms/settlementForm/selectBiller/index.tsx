import TextAvatar from "@src/components/atoms/textAvatar";
import { useEffect } from "react";
import { Container, ElementContainer, Wrapper, Avartar } from "./styles";

interface IUser {
  userId: number;
  userName: string;
  profilePath: null | string;
}

interface Props {
  isUpdate: boolean;
  payer: IUser | null;
  users: IUser[];
  selectedUser: any;
  setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
}

const SelectBiller = ({
  isUpdate,
  payer,
  users,
  selectedUser,
  setSelectedUser,
}: Props) => {
  useEffect(() => {
    if (isUpdate) return;
    setSelectedUser({
      ...users.reduce((r, { userId }) => {
        r[userId] = false;
        return r;
      }, {}),
      [payer?.userId as number]: true,
    });
  }, []);
  console.log(payer, users);

  return (
    <Container>
      <h2>결제자</h2>
      {payer !== null && (
        <Wrapper>
          <TextAvatar name={payer.userName} />
          <p>{payer.userName}</p>
        </Wrapper>
      )}
      <Wrapper>
        <Avartar />
        {payer !== null && <p>{payer.userName}</p>}
      </Wrapper>
      <h2>청구자를 선택해주세요!</h2>
      {users
        .filter((user) => user.userId !== payer?.userId)
        .map(({ userId, userName }) => (
          <ElementContainer>
            <Wrapper>
              <TextAvatar name={userName} />
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