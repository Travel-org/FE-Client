import { useNavigate } from "react-router-dom";
import {
  Image,
  ScheduleElementContainer,
  AvartarContainer,
  Avartar,
  Wrapper,
} from "./styles";

interface Props {
  title: string;
  users: any;
  startDate: string;
  endDate: string;
}

export const ScheduleElement = ({
  title,
  users,
  startDate,
  endDate,
}: Props) => {
  return (
    <ScheduleElementContainer>
      <Image src="https://blog.kakaocdn.net/dn/bvVHDV/btqYIk8ro2Z/EDCkAI9jXb3SMAlISvbWr0/img.jpg" />
      <Wrapper>
        <h3>{title}</h3>
        <div>
          <AvartarContainer>
            {users.map((user) => (
              <Avartar />
            ))}
          </AvartarContainer>
          <p>
            {startDate}~{endDate}
          </p>
        </div>
      </Wrapper>
    </ScheduleElementContainer>
  );
};

export default ScheduleElement;