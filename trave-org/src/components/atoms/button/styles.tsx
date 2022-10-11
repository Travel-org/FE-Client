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
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
  img {
    width: 1rem;
  }
`;

const LabelBtnStyle = styled.div`
  /* position: absolute; */
  background: white;
  border-radius: 0px 4px 4px 0px;
  right: -1.2rem;
  text-align: center;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
`;

export { ButtonStyle, KakaoBtnStyle, LabelBtnStyle };