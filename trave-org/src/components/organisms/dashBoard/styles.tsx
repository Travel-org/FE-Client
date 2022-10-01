import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const DashBaordStyle = styled.div`
  width: 30vw;
  background: white;
  div {
    padding: 1rem;
    box-sizing: border-box;
  }
  button {
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    align-items: center;
    border: none;
    background: ${theme.colors.grey[500]};
  }
`;

const ScheduleContainer = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  height: 60vh;
  overflow: auto;
`;

export { DashBaordStyle, ScheduleContainer };