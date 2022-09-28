import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const ButtonStyle = styled.button`
  border-radius: 10px;
  border: none;
  min-height: 2rem;
  color: white;
  background: ${theme.colors.blue[900]};
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

const KakaoBtnStyle = styled.div`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  background: #eed80c;
  column-gap: 0.5rem;
  img {
    width: 1rem;
  }
`;

export { ButtonStyle, KakaoBtnStyle };