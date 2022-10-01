import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";

const Container = styled(FlexDiv)`
  justify-content: center;
  `;

const ContentContainer = styled(FlexDiv)`
  position: absolute;
  padding: 4vw;
  margin: 2vw;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
`;
export { Container, ContentContainer };