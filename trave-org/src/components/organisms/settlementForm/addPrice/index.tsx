import { useEffect, useState } from "react";
import {
  Avartar,
  AvartarWrapper,
  Container,
  ElementContainer,
  PriceWrapper,
  Wrapper,
} from "./styles";

interface IUser {
  userId: number;
  userName: string;
}

interface Props {
  price?: number | string;
  setPrice: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  users: IUser[];
  selectedUser: any;
  usersPrice: {};
  setUsersPrice: React.Dispatch<React.SetStateAction<{}>>;
}

const AddPrice = ({
  price,
  setPrice,
  users,
  selectedUser,
  usersPrice,
  setUsersPrice,
}: Props) => {
  const userList = users.filter(({ userId }) => selectedUser[userId]);
  const [type, setType] = useState("직접 입력");

  const initializePrice = (amount: number) =>
    setUsersPrice(
      userList.reduce((r, { userId }) => {
        r[userId] = amount;
        return r;
      }, {})
    );

  useEffect(() => {
    initializePrice(0);
  }, []);

  useEffect(() => {
    if (type === "N분의1")
      initializePrice(
        price !== undefined && +price % userList.length === 0
          ? +price / userList.length
          : 0
      );
  }, [type, price]);

  return (
    <Container>
      <PriceWrapper>
        <h2>결제 금액을 입력해주세요!</h2>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
        />
      </PriceWrapper>
      <Wrapper>
        {["직접 입력", "N분의1"].map((t) => (
          <div>
            <input
              type="checkbox"
              checked={type === t}
              onClick={() => setType(t)}
            />
            <p>{t}</p>
          </div>
        ))}
      </Wrapper>
      <div>
        {userList.map(({ userId, userName }) => (
          <ElementContainer>
            <AvartarWrapper>
              <Avartar />
              <p>{userName}</p>
            </AvartarWrapper>
            <input
              value={usersPrice[userId]}
              readOnly={type === "N분의1"}
              onChange={(e) =>
                setUsersPrice({
                  ...usersPrice,
                  [userId]: e.target.value.replace(/\D/g, ""),
                })
              }
            />
          </ElementContainer>
        ))}
      </div>
    </Container>
  );
};

export default AddPrice;