import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const DashBaordStyle = styled.div`
  border-radius: inherit;
  padding: 1rem;
  z-index: 5;
  box-sizing: border-box;
  background: white;
  width: 30vh;
  height: 100%;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  div {
    padding: 1rem;
    box-sizing: border-box;
  }
`;

const InnerDashBoardStyle = styled.div`
  border-radius: inherit;
  padding: 1rem;
  height: 100%;
  width: 30vh;
  box-sizing: border-box;
  background: ${theme.colors.white};
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  z-index: 4;
  left: 24vw;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

const PastButton = styled(Button)`
  position: absolute;
  left: 1rem;
  width: 1rem;
  height: 1rem;
  background-size: cover;
  background-position: center;
  background-image: url("/left_arrow.svg");
`;

const TagButton = styled(Button)<{ status: boolean }>`
  border-radius: 30px;
  padding: 0.2rem 0.6rem;
  white-space: nowrap;
  font-size: 0.1rem;
  box-sizing: border-box;
  color: white;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  background: ${({ status }) =>
    status ? theme.colors.blue[600] : theme.colors.blue[300]};
`;

const AddButton = styled(Button)`
  border-radius: 10px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  align-items: center;
  border: none;
  color: white;
  background: ${theme.colors.grey[500]};
`;

const ScheduleContainer = styled.div`
  /* padding: 1rem;
  box-sizing: border-box; */
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  height: 60vh;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchContainer = styled.div`
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  overflow: auto;
`;

const SearchItem = styled.div<{ selected: boolean }>`
  /* outline: 1px solid ${({ selected }) =>
    selected ? "black" : "#00000029"}; */
  border-bottom: 1px solid;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export {
  DashBaordStyle,
  InnerDashBoardStyle,
  Wrapper,
  ScheduleContainer,
  SearchContainer,
  TagContainer,
  SearchItem,
  TagButton,
  PastButton,
  AddButton,
};