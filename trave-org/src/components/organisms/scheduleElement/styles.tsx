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
  grid-template-columns: repeat(3, 1fr);
  padding: 2vw;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: auto;
  column-gap: 2vw;
  row-gap: 2vh;
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScheduleElementContainer = styled.div`
  border-radius: 10px;
  min-width: 20vw;
  height: 100%;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
`;

const Wrapper = styled.div`
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  * {
    margin: 0px;
  }
  padding: 1rem;
  box-sizing: border-box;
  div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    p {
      font-size: 0.6rem;
    }
  }
`;

const Image = styled.img`
  border-radius: 10px 10px 0px 0px;
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

const NewScheduleBtn = styled.button`
  border: none;
  background: none;
  border-radius: 10px;
  min-width: 20vw;
  height: 100%;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  font-size: 3rem;
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

export {
  Container,
  ScheduleWrapper,
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
  Wrapper,
  NewScheduleBtn,
};