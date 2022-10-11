import { Container, ElementWrapper, ModalContainer, Input } from "./styles";
import PartyElement from "@atoms/partyElement";
import Button from "@atoms/button";
import Portal from "@src/portal";
import Modal from "@organisms/modal";
import { useRef, useState } from "react";

const data = { email: "pkb8839@naver.com" };

interface Props {
  userEmails: string[];
  addUserEmail: (email: any) => void;
}

const AddParty = ({ userEmails, addUserEmail }: Props) => {
  const [modalOnOff, setModalOnOff] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleAddUser = () => {
    if (inputRef.current?.value === "") return;
    addUserEmail(inputRef.current?.value);
    setModalOnOff(false);
  };
  return (
    <Container>
      <ElementWrapper>
      {userEmails.map((email, i) => (
          <PartyElement key={i} email={email} />
        ))}
      </ElementWrapper>
      <Button onClick={() => setModalOnOff(true)}>추가</Button>

      {modalOnOff && (
        <Modal
          onClick={(e) => {
            e.preventDefault();
            setModalOnOff(false);
          }}
        >
          <ModalContainer>
            <h2>추가 할 일행의 이메일을 입력해주세요.</h2>
            <Input ref={(el) => (inputRef.current = el as HTMLInputElement)} />
            <Button onClick={handleAddUser}>추가</Button>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};

export default AddParty;