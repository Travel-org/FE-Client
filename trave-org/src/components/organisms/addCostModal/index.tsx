import { useEffect, useState } from "react";

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
import SelectPayer from "@src/components/organisms/settlementForm/selectPayer";
import SelectBiller from "@src/components/organisms/settlementForm/selectBiller";
import AddPrice from "@src/components/organisms/settlementForm/addPrice";
import { api } from "@src/app/api/api";
import travelApi from "@src/app/api/travelApi";

interface UserCost {
  amount: number;
  isRequested: boolean;
  simpleUserInfoDto: {
    profilePath: string;
    userId: number;
    userName: string;
  };
  userCostId: number;
}

interface IUser {
  userId: number;
  userName: string;
  profilePath: null | string;
}

const AddCostModal = ({
  travelId,
  isClose,
  users,
  costData,
}: {
  travelId: string | undefined;
  users: any;
  costData?: {
    costId: string;
    title: string;
    content: string;
    totalAmount: number;
    userCosts: UserCost[];
    payerId: number;
  };
  isClose?: () => void;
}) => {
  const [createCost] = api.useCreateCostMutation();
  const [updateCost] = api.useUpdateCostMutation();
  const [memo, setMemo] = useState("");
  const [title, setTitle] = useState("");
  const [payer, setPayer] = useState<IUser | null>(null);
  const [price, setPrice] = useState<number | string>();
  const [selectedUser, setSelectedUser] = useState({});
  const [usersPrice, setUsersPrice] = useState<{ [key: number]: number }>({});
  const [countChip, setCountChip] = useState(0);

  const handlePast = () => setCountChip(Math.max(0, countChip - 1));
  const handleNext = () =>
    title !== "" && setCountChip(Math.min(3, countChip + 1));

  useEffect(() => {
    if (costData === undefined) return;
    setTitle(costData.title);
    setMemo(costData.content);
    const { userId, userName, profilePath } = users.filter(
      ({ userId }) => costData.payerId === userId
    )[0];
    setPayer({ userId, userName, profilePath });
    setPrice(costData.totalAmount);
    setSelectedUser({
      ...users.reduce((r, { userId }) => {
        r[userId] = false;
        return r;
      }, {}),
      ...{
        ...costData.userCosts.reduce((r, { simpleUserInfoDto: { userId } }) => {
          r[userId] = true;
          return r;
        }, {}),
        [costData.payerId as number]: true,
      },
    });
    setUsersPrice(
      costData.userCosts.reduce(
        (r, { simpleUserInfoDto: { userId }, amount }) => {
          r[userId] = Number(amount);
          return r;
        },
        {}
      )
    );
    setCountChip(3);
  }, []);

  useEffect(() => {
    console.log(selectedUser, usersPrice);
  }, [selectedUser, usersPrice]);

  const compareUserPrice =
    Number(price) ==
    Object.values(usersPrice).reduce((r: number, v) => r + Number(v), 0);

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
        isClose !== undefined && isClose();
      }
    } else alert("금액이 맞지 않습니다.");
  };

  const handleUpdate = () => {
    if (price !== undefined && +price > 0 && compareUserPrice) {
      {
        updateCost({
          costId: costData?.costId!,
          amountsPerUser: usersPrice as any,
          title: title,
          content: memo,
          payerId: payer?.userId as number,
          totalAmount: price as number,
          travelId: travelId as string,
        });
        isClose !== undefined && isClose();
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
              isUpdate={costData === undefined ? false : true}
              payer={payer}
              users={users!}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          )}
          {countChip === 3 && (
            <AddPrice
              isUpdate={costData === undefined ? false : true}
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
            costData === undefined ? (
              <Button onClick={goNextPage}>생성</Button>
            ) : (
              <Button onClick={handleUpdate}>수정</Button>
            )
          ) : (
            <Button onClick={handleNext}>다음</Button>
          )}
        </Footer>
      </SubContainer>
    </Container>
  );
};

export default AddCostModal;