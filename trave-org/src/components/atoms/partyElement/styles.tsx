mport styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div`
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;
const Image = styled.div`
  min-width: 4rem;
  min-height: 4rem;
  border-radius: 10px;
  background: ${theme.colors.grey[600]};
`;
export { Container, Image };