import { css } from "@emotion/react";
import { theme } from "@src/styles/theme";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Footer,
  Header,
  SettlementElementContainer,
} from "./styles";

const Chip = ({ content, color }: { content: string; color: string }) => {
  return (
    <div
      css={css`
        border-radius: 15px;
        padding: 0.2rem 1rem;
        background: ${color};
        color: white;
        border: none;
        font-weight: 400;
      `}
    >
      {content}
    </div>
  );
};

const SettlementElement = ({
  chipContent,
  color,
  content,
  userList,
  price,
}: any) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 1rem;
        cursor: pointer;
        :hover {
          opacity: 50%;
        }
      `}
    >
      <input type="checkbox" />
      <div
        css={css`
          width: 100%;
          display: flex;
          border-bottom: 1px solid #d7d7d7;
          padding: 0px 1rem;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Chip content={chipContent} color={color} />
        <p>{content}</p>
        <div
          css={css`
            display: flex;
            column-gap: 1rem;
            div {
              border: 1px solid grey;
              width: 1.6rem;
              height: 1.6rem;
              border-radius: 100vw;
              background: green;
            }
            > :first {
              margin: 0px;
            }
            > * {
              margin-left: -1.6rem;
            }
          `}
        >
          {userList.map((img) => (
            <div />
          ))}
        </div>
        <p>{price}</p>
      </div>
    </div>
  );
};

const Settlement = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Header>
          <div>
            <button>일괄 선택</button>
            <h2>전체 내역 : 25건</h2>
          </div>
          <div>
            <p>항목</p>
            <input />
          </div>
        </Header>
        <SettlementElementContainer>
          <p>2022년 05월 23일</p>
          {Array.from({ length: 10 }).map((v) => (
            <SettlementElement
              {...{
                chipContent: "생활",
                color: "green",
                content: "음료",
                price: 3000,
                userList: ["", "", ""],
              }}
            />
          ))}
          <p>2022년 05월 24일</p>
          {Array.from({ length: 10 }).map((v) => (
            <SettlementElement
              {...{
                chipContent: "생활",
                color: "green",
                content: "음료",
                price: 3000,
                userList: ["", "", ""],
              }}
            />
          ))}
          <p>2022년 05월 25일</p>
          {Array.from({ length: 5 }).map((v) => (
            <SettlementElement
              {...{
                chipContent: "생활",
                color: "green",
                content: "음료",
                price: 3000,
                userList: ["", "", ""],
              }}
            />
          ))}
        </SettlementElementContainer>
        <Footer>
          <button>일괄정산</button>
          <button onClick={() => navigate("/newSettlement")}>추가하기</button>
        </Footer>
      </Container>
    </>
  );
};
export default Settlement;