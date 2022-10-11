import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    align-items: center;
    input {
      border: 1px solid black;
      width: 100%;
      padding: 1rem;
      border-radius: 15px;
    }
  }
`;

export { Container };