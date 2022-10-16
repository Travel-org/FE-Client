import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  min-width: 350px;
  box-sizing: border-box;
  row-gap: 1rem;
  background-color: rgba(255, 255, 255);
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const AvarTarContainer = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-left: -10px;
    border: 2px solid white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;

export { Container, SubContainer, AvarTarContainer, Wrapper };