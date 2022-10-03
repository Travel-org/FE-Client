import { Link, useNavigate } from "react-router-dom";
import { NavigationStyle, Margin } from "./styles";
import isLogin from "@utils/isLogin";
import Logo from "@src/components/logo";
import styled from "@emotion/styled";

interface Props {
  user: boolean;
}

const Wrapper = styled.div`
  background: white;
  position: relative;
  padding: 0px 24px;
  height: 8vh;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: inline-flex;
    align-items: center;
    column-gap: 1rem;
  }
  p {
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;

const Navigation = ({ user }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationStyle>
      <Wrapper>
          <Link to = "/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
          <div>
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