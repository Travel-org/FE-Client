import { css } from "@emotion/react";
import { api } from "@src/app/api/api";
import TextAvatar from "@src/components/atoms/textAvatar";
import Modal from "@src/components/modal";
import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiPencil, BiX } from "react-icons/bi";
import AddCostModal from "../addCostModal";
import { AvarTarContainer, Container, SubContainer, Wrapper } from "./styles";

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

interface Props {
  data: {
    costId: string;
    title: string;
    content: string;
    totalAmount: number;
    userCosts: UserCost[];
    payerId: number;
  };
  users: any;
  travelId: string;
  isDelete: boolean;
  isModalOpen: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<number>>;
  handleSelectCostDelete: (string) => void;
}

const CostElement = ({
 users,
  data,
  isModalOpen,
  setIsModalOpen,
  travelId,
  isDelete,
  handleSelectCostDelete,
}: Props) => {
  const { costId, title, content, totalAmount, userCosts, payerId } = data;
  const payer = userCosts.filter(
    ({ simpleUserInfoDto: { userId } }) => userId === payerId
  )[0];
  const [amount] = useState(10000);
  const [isExpand, setIsExpand] = useState(false);
  const handleUpdate = () => {
    setIsModalOpen(Number(costId));
  };
  return (
    <>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
          <Container
          css={css`
            transition: all 0.5s ease-out;
            right: ${isDelete ? "1rem" : "0px"};
          `}
          onClick={() => setIsExpand(!isExpand)}
        >
          <SubContainer>
            <Wrapper>
              <TextAvatar name={payer?.simpleUserInfoDto.userName} />
              <div>
                <div>{title}</div>
                <div>{content}</div>
              </div>
            </Wrapper>
            <AvarTarContainer>
              {userCosts.map(({ simpleUserInfoDto: { userName } }) => (
                <TextAvatar name={userName} />
              ))}
            </AvarTarContainer>
            {isExpand ? <BiChevronUp /> : <BiChevronDown />}
          </SubContainer>
          {isExpand && (
            <>
              <div
                css={css`
                  box-sizing: border-box;
                  border: 0.4px solid black;
                  width: 100%;
                `}
              />
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  row-gap: 1rem;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    div {
                      align-items: center;
                      display: flex;
                      gap: 1rem;
                    }
                  `}
                >
                  <div>
                    <p>결제자</p>
                    <TextAvatar name={payer?.simpleUserInfoDto.userName} />
                  </div>
                  <div>
                    <p>금액</p>
                    <p>{totalAmount}</p>
                    <BiPencil
                      css={css`
                        cursor: pointer;
                        :hover {
                          opacity: 50%;
                        }
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate();
                      }}
                    />
                  </div>
                </div>

                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem;
                  `}
                >
                  {userCosts?.map(({ amount, simpleUserInfoDto }) => (
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                      `}
                    >
                      <TextAvatar name={simpleUserInfoDto.userName} />
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                          width: 80%;
                        `}
                      >
                        <div
                          css={css`
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            p {
                              margin: 0px;
                            }
                          `}
                        >
                          <p>{simpleUserInfoDto.userName}</p>
                          <p>{amount}</p>
                        </div>
                        <input
                          type="range"
                          step={1}
                          max={totalAmount}
                          value={amount}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Container>
        {isDelete && (
          <input
            css={css`
            transition: all 0.5s ease-out;
            `}
            type={"radio"}
            onClick={() => handleSelectCostDelete(costId)}
          />
        )}
      </div>
      {isModalOpen === Number(costId) && (
        <Modal onClick={() => setIsModalOpen(-1)}>
          <AddCostModal
            users={users}
            travelId={travelId}
            costData={data}
            isClose={() => setIsModalOpen(-1)}
          />
        </Modal>
      )}
    </>
  );
};

export default CostElement;