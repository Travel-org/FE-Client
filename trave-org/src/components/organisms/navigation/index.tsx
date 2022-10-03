import { Link, useNavigate } from "react-router-dom";
import isLogin from "@utils/isLogin";
import { Logo } from "@src/components/logo";
import styled from "@emotion/styled";
import { NavigationStyle, Margin } from "./styles";
import { selectCurrentUser } from "@src/app/api";
import { useAppSelector } from "@src/app/hooks";

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

function Navigation({ user }: Props) {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <NavigationStyle>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo color="#1e52e2" />
        </Link>
        <div>
          <p onClick={() => navigate("/schedule")}>계획</p>
          <p onClick={() => navigate("/search")}>조회</p>
          <p onClick={() => navigate("/settlement")}>정산</p>
        </div>
        {!currentUser && <p onClick={() => navigate("/signIn")}>로그인</p>}
        {currentUser && <p>로그아웃</p>}
      </Wrapper>
    </NavigationStyle>
  );
};
export default Navigation;