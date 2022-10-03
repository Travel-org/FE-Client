import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@src/components/logo";
import styled from "@emotion/styled";
import { api, selectCurrentUser } from "@src/app/api";
import { useAppSelector } from "@src/app/hooks";
import { NavigationStyle, Margin } from "./styles";

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
  const [logout] = api.useLogoutMutation();

  return (
    <NavigationStyle>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo color="#1e52e2" />
        </Link>
        <div>
          <Link to="/schedule">
            <p>계획</p>
          </Link>
          <Link to="/search">
            <p>조회</p>
          </Link>
          <Link to="/settlement">
            <p>정산</p>
          </Link>
        </div>
        {!currentUser && <p onClick={() => navigate("/signIn")}>로그인</p>}
        {currentUser && <p onClick={() => logout()}>로그아웃</p>}
      </Wrapper>
    </NavigationStyle>
  );
}
export default Navigation;
