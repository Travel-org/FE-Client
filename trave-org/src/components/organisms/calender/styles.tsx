import styled from "@emotion/styled";

const CalenderNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  row-gap: 2rem;
`;

export { CalenderNav, Wrapper };