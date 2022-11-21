import { KakaoBtnStyle } from "./styles";

const KakaoBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <KakaoBtnStyle onClick={onClick}>
      <img src="/kakao.svg" />
      <p>Login</p>
    </KakaoBtnStyle>
  );
};

export default KakaoBtn;