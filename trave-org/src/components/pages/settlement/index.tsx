import { css } from "@emotion/react";
import { api } from "@src/app/api/api";
import { theme } from "@src/styles/theme";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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

const SettlementElement = ({ title, totalAmount, userIds }: any) => {
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
          p {
            text-align: center;
            width: 5vw;
          }
          p:nth-child(1) {
            text-align: start;
            max-width: 10vw;
            width: 10vw;
          }
        `}
      >
        <p>{title}</p>
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
          {userIds.map((img) => (
            <div />
          ))}
        </div>
        <p>{totalAmount}</p>
      </div>
    </div>
  );
};

const Settlement = () => {
  const { travelId } = useParams<"travelId">();
  const navigate = useNavigate();
  const { data: costData } = api.useGetCostByTravelIdQuery(travelId!);
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
          {costData !== undefined &&
            costData.map(({ title, totalAmount, userIds }) => (
              <SettlementElement
                {...{
                  title,
                  totalAmount,
                  userIds,
                }}
              />
            ))}
        </SettlementElementContainer>
        <Footer>
          <button>일괄정산</button>
          <NavLink to={"/newSettlement/" + travelId}>
            <button>추가하기</button>
          </NavLink>
        </Footer>
      </Container>
    </>
  );
};
export default Settlement;
