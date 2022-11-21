import { api } from "@src/app/api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "./styles";

const Invite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acceptInvite] = api.useAcceptInviteMutation();
  const [rejectInvite] = api.useRejectInviteMutation();
  const handleRejectCode = () => {
    const data = rejectInvite(id!);
    navigate("/dashboard");
  };
  const handleAcceptCode = () => {
    const data = acceptInvite(id!);
    navigate("/dashboard/travels");
  };
  return (
    <Container direction="column">
      <h2>Travely에 오신 것을 환영합니다!</h2>
      <p>id : {id}</p>
      <div>
        <button onClick={handleRejectCode}>취소</button>
        <button onClick={handleAcceptCode}>승락</button>
      </div>
    </Container>
  );
};

export default Invite;