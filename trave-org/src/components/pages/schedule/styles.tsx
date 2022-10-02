import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";
const Container = styled(FlexDiv)`
  background: white;
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
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  color: black;
  background: white;
  margin: 3rem;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 60%;
  background: white;
`;

const AvartarContainer = styled.div`
  display: flex;
  > * {
    margin-left: -0.5rem;
  }
  > *:first-of-type {
    margin-left: 0;
  }
`;

const Avartar = styled.div`
  border-radius: 100vw;
  background: green;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  width: 1.6rem;
  height: 1.6rem;
`;

export {
  Container,
  ScheduleWrapper,
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
};