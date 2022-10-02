import { useNavigate } from "react-router-dom";
import { NavigationStyle, Logo, Wrapper, Margin } from "./styles";
import isLogin from "@utils/isLogin";

interface Props {
  user: boolean;
}

const Navigation = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationStyle>
        <Wrapper>
          <div>
            <Logo onClick={() => navigate("/")} src="/로고.png" />
            <p onClick={() => navigate("/schedule")}>계획</p>
            <p onClick={() => navigate("/search")}>조회</p>
            <p onClick={() => navigate("/settlement")}>정산</p>
          </div>
          {!isLogin() && <p onClick={() => navigate("/signIn")}>로그인</p>}
          {isLogin() && <p>로그아웃</p>}
        </Wrapper>
      </NavigationStyle>
    </>
  );
};

export default Navigation;