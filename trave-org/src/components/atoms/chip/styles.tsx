import styled from "@emotion/styled";
import { theme } from "@styles/theme";

const Container = styled.div<{ status: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  padding: 0.4rem 1rem 0.4rem 0.4rem;
  * {
    margin: 0px;
  }
  border-radius: 30px;
  div {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border-radius: 100vw;
    background: ${({ status }) =>
      status ? theme.colors.green[600] : theme.colors.white};
  }
  color: ${({ status }) =>
    status ? theme.colors.green[600] : theme.colors.grey[600]};
  background: ${({ status }) =>
    status ? theme.colors.green[300] : theme.colors.grey[300]};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1rem;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.4rem;
  }
`;

export { Container };