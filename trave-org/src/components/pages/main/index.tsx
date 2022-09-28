import { Container, Background, Banner } from "./styles";
import Board from "@organisms/board";
const Content = () => {
  return (
    <div style={{ padding: "3rem 12rem" }}>
      <select style={{ width: "100%", padding: "1rem", borderRadius: "10px" }}>
        <option>인기순</option>
        <option>최신순</option>
      </select>
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </div>
  );
};

const Main = () => {
  return (
    <Container>
      <Banner>
        <Background url="./background1.jpeg" />
        <p>여행을 계획해 보세요.</p>
      </Banner>
      <Content />
    </Container>
  );
};

export default Main;