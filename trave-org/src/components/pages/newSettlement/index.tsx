import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@atoms/button";
import Chip from "@atoms/chip";
import {
  Container,
  ChipWrapper,
  FormWrapper,
  SubContainer,
  Footer,
} from "./styles";
import SelectTitle from "@src/components/organisms/settlementForm/selectTitle";
import SelectPayer from "@src/components/organisms/settlementForm/selectPlayer";
import SelectBiller from "@src/components/organisms/settlementForm/selectBiller";
import AddPrice from "@src/components/organisms/settlementForm/addPrice";
import { api } from "@src/app/api";

interface IUser {
  userId: number;
  userName: string;
  profilePath: null | string;
}

const NewSettlement = () => {
  const navigate = useNavigate();
  const { travelId } = useParams<"travelId">();
  const { data: users } = api.useGetUsersQuery(travelId!);
  const [createCost] = api.useCreateCostMutation();
  const [memo, setMemo] = useState("");
  const [title, setTitle] = useState("");
  const [payer, setPayer] = useState<IUser | null>(null);
  const [price, setPrice] = useState<number | string>();
  const [selectedUser, setSelectedUser] = useState({});
  const [usersPrice, setUsersPrice] = useState({});
  const [countChip, setCountChip] = useState(0);
  const handlePast = () => setCountChip(Math.max(0, countChip - 1));
  const handleNext = () =>
    title !== "" && setCountChip(Math.min(3, countChip + 1));
  const compareUserPrice =
    price ==
    Object.values(usersPrice).reduce((r: number, v) => r + (v as number), 0);
  const goNextPage = () => {
    if (price !== undefined && +price > 0 && compareUserPrice) {
      {
        createCost({
          amountsPerUser: usersPrice as any,
          title: title,
          content: memo,
          payerId: payer?.userId as number,
          totalAmount: price as number,
          travelId: travelId as string,
        });
        navigate("/settlement");
      }
    } else alert("금액이 맞지 않습니다.");
  };
  return (
    <Container direction="column">
      <h2>정산 생성</h2>
      <SubContainer>
        <ChipWrapper>
          {["정산 내용 입력", "결제자 선택", "인원 선택", "금액 입력"].map(
            (content, num) => (
              <Chip
                key={num}
                {...{ content, num, status: countChip === num }}
              />
            )
          )}
        </ChipWrapper>
        <FormWrapper>
          {countChip === 0 && (
            <SelectTitle
              memo={memo}
              setMemo={setMemo}
              title={title}
              setTitle={setTitle}
            />
          )}
          {countChip === 1 && (
            <SelectPayer payer={payer} setPayer={setPayer} users={users!} />
          )}
          {countChip === 2 && (
            <SelectBiller
              payer={payer}
              users={users!}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {countChip === 3 && (
            <AddPrice
              price={price}
              setPrice={setPrice}
              users={users!}
              selectedUser={selectedUser}
              usersPrice={usersPrice}
              setUsersPrice={setUsersPrice}
            />
          )}
        </FormWrapper>
        <Footer direction="row">
          {countChip !== 0 && <Button onClick={handlePast}>이전</Button>}
          {countChip == 3 ? (
            <Button onClick={goNextPage}>생성</Button>
          ) : (
            <Button onClick={handleNext}>다음</Button>
          )}
        </Footer>
      </SubContainer>
    </Container>
  );
};
export default NewSettlement;