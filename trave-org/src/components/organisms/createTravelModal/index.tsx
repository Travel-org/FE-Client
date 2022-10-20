import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@atoms/button";
import Chip from "@atoms/chip";
import SelectDate from "@organisms/scheduleForm/selectDate";
import SelectTitle from "@src/components/organisms/scheduleForm/selectTitle";
import AddParty from "@organisms/scheduleForm/addParty";

import {
  Container,
  ChipWrapper,
  FormWrapper,
  SubContainer,
  Footer,
} from "./styles";
import travelApi from "@src/app/api/travelApi";

function CreateTravelModal({ onSuccess }: { onSuccess: () => void }) {
  const params = useLocation().state as any;
  const [createTravel, { data }] = travelApi.useCreateTravelMutation();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<any>([new Date(), new Date()]);
  const [countChip, setCountChip] = useState(0);
  const [title, setTitle] = useState("");
  const [userEmails, setUserEmails] = useState<string[]>([]);

  const addUserEmail = (email) => setUserEmails((v) => [...v, email]);

  const handlePast = () => setCountChip(Math.max(0, countChip - 1));

  const handleEmptyTitle = countChip === 1 ? title !== "" : true;

  const setDateFormat = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;

  const handleNext = () =>
    handleEmptyTitle && setCountChip(Math.min(2, countChip + 1));
  const goNextPage = async () => {
    const [startDate, endDate] = dateRange;
    createTravel({
      startDate: setDateFormat(startDate),
      endDate: setDateFormat(endDate),
      title,
      userEmails,
    });
    onSuccess();
  };

  useEffect(() => {
    if (!params) return;
    setDateRange([params?.dayStart, params?.dayEnd]);
    setCountChip(2);
    setTitle(params?.title);
  }, [params]);

  useEffect(() => {
    if (data !== undefined) navigate("/dashboard/travels");
  }, [data]);

  return (
    <Container direction="column">
      <h2>새 여행 생성</h2>
      <SubContainer>
        <ChipWrapper>
          {["일정 선택", "여행 세부 설정", "일행 추가"].map((content, num) => (
            <Chip key={num} {...{ content, num, status: countChip === num }} />
          ))}
        </ChipWrapper>
        <FormWrapper>
          {countChip === 0 && (
            <SelectDate dateRange={dateRange} setDateRange={setDateRange} />
          )}
          {countChip === 1 && <SelectTitle title={title} setTitle={setTitle} />}
          {countChip === 2 && (
            <AddParty userEmails={userEmails} addUserEmail={addUserEmail} />
          )}
        </FormWrapper>
        <Footer direction="row">
          {countChip !== 0 && <Button onClick={handlePast}>이전</Button>}
          {countChip == 2 ? (
            <Button onClick={goNextPage}>생성</Button>
          ) : (
            <Button onClick={handleNext}>다음</Button>
          )}
        </Footer>
      </SubContainer>
    </Container>
  );
}

export default CreateTravelModal;