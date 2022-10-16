import { css } from "@emotion/react";
import TextAvatar from "@src/components/atoms/textAvatar";
import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiX } from "react-icons/bi";
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
  title: string;
  content: string;
  totalAmount: number;
  userCosts: UserCost[];
  payerId: number;
}

const CostElement = ({
  title,
  content,
  totalAmount,
  userCosts,
  payerId,
}: Props) => {
  const payer = userCosts.filter(
    ({ simpleUserInfoDto: { userId } }) => userId === payerId
  )[0];
  const [amount] = useState(10000);
  const [isExpand, setIsExpand] = useState(false);
  return (
    <Container onClick={() => setIsExpand(!isExpand)}>
      <SubContainer>
        <Wrapper>
          <TextAvatar name={payer.simpleUserInfoDto.userName} />
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
                <TextAvatar name={payer.simpleUserInfoDto.userName} />
              </div>
              <div>
                <p>금액</p>
                <p>{payer.amount}</p>
              </div>
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                row-gap: 1rem;
              `}
            >
              {userCosts.map(({ amount, simpleUserInfoDto }) => (
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
                  <BiX />
                </div>
              ))}
            </div>
            <button>+</button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CostElement;