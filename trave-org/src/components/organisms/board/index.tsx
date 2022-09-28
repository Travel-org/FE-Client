import styled from "@emotion/styled";

const Container = styled.div`
  border: 1px solid whitesmoke;
  border-radius: 10px;
  min-height: 10vh;
  min-width: 8vw;
`;

const Line = styled.div`
  width: 100%;
  border: 1px solid whitesmoke;
`;

const Board = () => {
  return (
    <Container>
      <p>제목</p>
      <p>본문</p>
      <Line />
      <div></div>
    </Container>
  );
};

export default Board;