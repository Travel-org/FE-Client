import styled from "@emotion/styled";

const Container = styled.div`
  select {
    align-items: center;
  }
`;

const Background = styled.img<{ url: string }>`
  position: absolute;
  width: 100%;
  height: 50vh;
  background-image: linear-gradient(
      rgba(26, 27, 30, 0.7),
      rgba(26, 27, 30, 0.7)
    ),
    url(${({ url }) => url});
  object-fit: cover;
  background-size: cover;
`;

const Banner = styled.div`
  position: relative;
  height: 50vh;
  p {
    position: absolute;
    font-size: 4rem;
    color: white;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export { Container, Background, Banner };