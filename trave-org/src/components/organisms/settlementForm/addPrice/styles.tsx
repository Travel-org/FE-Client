import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-self: center;
  flex-direction: column;
  justify-content: center;
`;

const PriceWrapper = styled.div`
  width: 100%;
  align-items: center;
  input {
    border: 1px solid black;
    width: 100%;
    padding: 1rem;
    border-radius: 15px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  div {
    display: flex;
    align-items: center;
  }
`;

const ElementContainer = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  border-bottom: 1px solid grey;
`;

const AvartarWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  height: 2rem;
  column-gap: 2rem;
  align-items: center;
`;

const Avartar = styled.div`
  background: cadetblue;
  width: 2rem;
  height: 2rem;
  border-radius: 100vw;
`;

export {
  Container,
  PriceWrapper,
  Wrapper,
  ElementContainer,
  AvartarWrapper,
  Avartar,
};