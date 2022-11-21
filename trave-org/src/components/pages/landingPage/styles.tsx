import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div`
  height: 100%;
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

const Wrapper = styled.div`
  P {
    margin: 0;
    width: 100%;
    height: 2rem;
    font-size: 24px;
    font-weight: 600;
  }
  input {
    border: 0;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    p {
      font-size: 12px;
    }
    input {
      font-size: 8px;
    }
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    p {
      font-size: 8px;
    }
    input {
      font-size: 6px;
    }
  }
`;

const ArrowImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const SubmitBtn = styled.button`
  width: 3rem;
  height: 3rem;
  background: #3b71fe;
  border-radius: 50%;
  border: 0;
  display: flex;
  justify-content: center;
  align-content: center;
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

export { Container, Background, Banner, Wrapper, ArrowImg, SubmitBtn };