import { Container, ElementWrapper, ModalContainer, Input } from "./styles";
import PartyElement from "@atoms/partyElement";
import Button from "@atoms/button";
import Portal from "@src/portal";
import Modal from "@organisms/modal";
import { useState } from "react";

const data = { name: "차재명", email: "maxcha98@ajou.ac.kr" };

const AddParty = () => {
  const [modalOnOff, setModalOnOff] = useState(false);
  return (
    <Container>
      <ElementWrapper>
        {Array.from({ length: 20 }, () => data).map((v) => (
          <PartyElement {...v} />
        ))}
      </ElementWrapper>
      <Button onClick={() => setModalOnOff(true)}>추가</Button>

      {modalOnOff && (
        <Modal>
          <ModalContainer>
            <h2>추가 할 일행의 이메일을 입력해주세요.</h2>
            <Input />
            <Button onClick={() => setModalOnOff(false)}>추가</Button>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

export default AddParty;