import { useEffect } from "react";
import { Input } from "./styles";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const SelectTitle = ({ title, setTitle }: Props) => {
  return (
    <>
      <h2>여행의 이름을 알려주세요</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
    </>
  );
};

export default SelectTitle;