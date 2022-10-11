import { Container } from "./styles";

interface Props {
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const SelectTitle = ({ memo, setMemo, title, setTitle }: Props) => {
  return (
    <Container>
      <div>
        <h2>어떤 품목을 지출하셨나요?</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <h2>메모하실 내용을 적어주세요!</h2>
        <input value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>
    </Container>
  );
};

export default SelectTitle;