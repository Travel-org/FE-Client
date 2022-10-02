import { useNavigate, useParams } from "react-router-dom";
import { Container } from "./styles";

const Invite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/liveSchedule", { state: { id } });
  };
  return (
    <Container direction="column">
      <h2>Travely에 오신 것을 환영합니다!</h2>
      <p>id : {id}</p>
      <div>
        <button>취소</button>
        <button onClick={handleRedirect}>승락</button>
      </div>
    </Container>
  );
};

export default Invite;