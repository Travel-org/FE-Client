import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@atoms/button";
import Chip from "@atoms/chip";
import SelectDate from "@organisms/scheduleForm/selectDate";
import SelectDestination from "@src/components/organisms/scheduleForm/selectTitle";
import AddParty from "@organisms/scheduleForm/addParty";

import { FlexDiv } from "@src/styles";

import { Container, ChipWrapper, FormWrapper } from "./styles";

const Settlement = () => {
  const navigate = useNavigate();
  const [countChip, setCountChip] = useState(0);

  const handlePast = () => setCountChip(Math.max(0, countChip - 1));
  const handleNext = () => setCountChip(Math.min(2, countChip + 1));
  const goNextPage = () => navigate("/liveSchedule");
  return (
    <Container direction="column">
      <h2>정산 생성</h2>
      {/* <ChipWrapper>
        {["결제자 선택", "정산 품목 선택", "정산 세부 항목"].map(
          (content, num) => (
            <Chip key={num} {...{ content, num, status: countChip === num }} />
          )
        )}
      </ChipWrapper>
      <FormWrapper>
        {countChip === 0 && <SelectDate />}
        {countChip === 1 && <SelectDestination />}
        {countChip === 2 && <AddParty />}
      </FormWrapper>
      <FlexDiv direction="row">
        {countChip !== 0 && <Button onClick={handlePast}>이전</Button>}
        {countChip == 2 ? (
          <Button onClick={goNextPage}>생성</Button>
        ) : (
          <Button onClick={handleNext}>다음</Button>
        )}s
      </FlexDiv> */}
    </Container>
  );
};

export default Settlement;