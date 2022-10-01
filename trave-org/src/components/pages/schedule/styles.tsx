import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";
const Container = styled(FlexDiv)`
  background: white;
  height: 92vh;
  padding: 4vw;
  box-sizing: border-box;
  justify-content: space-between;
  button {
    width: 100%;
  }
`;

const ScheduleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 2vw;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: auto;
  column-gap: 2vw;
  row-gap: 2vh;
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScheduleElementContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 2vw;
  box-sizing: border-box;
  font-size: 1rem;
  color: white;
  background: grey;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
`;

export { Container, ScheduleWrapper, ScheduleElementContainer };