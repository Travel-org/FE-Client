import { LabelBtnStyle } from "./styles";

interface Props {
  url: string;
  onClick?: () => void;
}

const LabelBtn = ({ url, onClick }: Props) => {
  return (
    <LabelBtnStyle onClick={onClick}>
      <img src={url} />
    </LabelBtnStyle>
  );
};
export default LabelBtn;