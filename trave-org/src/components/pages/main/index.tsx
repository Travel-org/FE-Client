import { jsx, css } from "@emotion/react";
import Board from "@organisms/board";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Container, Background, Banner } from "./styles";

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

const tempData = {
  title: "예비군 학생 훈련",
  dates: "9월 27일 - 9월 28일",
  participants: [
    {
      profileUrl:
        "https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg",
    },
    {
      profileUrl:
        "https://yt3.ggpht.com/TYUWqBP6XRBWhEIC8VmVUMt4I2vMtrcVgqvVDD2oGUy8SCMSQrjE4ZgSN0DmF8dNT4VCBHoR=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      profileUrl:
        "https://blog.kakaocdn.net/dn/chGFjc/btqNF9OW8LC/aRSsqBE0Gp2VpjoCoZhr21/img.jpg",
    },
    {
      profileUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/253px-Donald_Trump_official_portrait.jpg",
    },
  ],
};

const datas = [
  tempData,
  tempData,
  tempData,
  tempData,
  tempData,
  tempData,
  tempData,
  tempData,
];

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Main = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef<any>();

  useEffect(() => {
    setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
  }, []);

  return (
    <div
      css={css`
        height: 100vh;
        align-items: center;
        margin: 0px 10px;
      `}
    >
      <div
        css={css`
          font-size: 24px;
          font-weight: 500;
        `}
      >
        다가오는 계획
      </div>
      <motion.div
        ref={ref}
        css={css`
          cursor: grab;
          overflow: hidden;
        `}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          css={css`
            display: flex;
            > * {
              margin: 0px 10px;
            }
            > *:first-of-type {
              margin-left: 0;
            }
            > *:last-of-type {
              margin-right: 0;
            }
          `}
        >
          {datas.map((data, i) => {
            return (
              <motion.div
                key={i}
                css={css`
                  width: 100px;
                  min-width: 100px;
                  padding: 10px;
                  background: white;
                  border-radius: 15px;
                  display: flex;
                  flex-direction: column;
                `}
              >
                <div
                  css={css`
                    height: 80px;
                    background: lightgrey;
                    border-radius: 10px;
                    margin-bottom: 5px;
                  `}
                >
                  <img
                    src={
                      "https://img.khan.co.kr/news/2022/01/02/l_2022010201000132500007231.jpg"
                    }
                    style={{
                      height: "100%",
                      borderRadius: "10px",
                      width: "100%",
                    }}
                  />
                </div>
                <span
                  css={css`
                    font-weight: 500;
                    font-size: 14px;
                  `}
                >
                  {data.title}
                </span>
                <span
                  css={css`
                    font-weight: 400;
                    font-size: 10px;
                    color: #939393;
                  `}
                >
                  {data.dates}
                </span>

                <div
                  css={css`
                    display: flex;
                    > * {
                      margin-left: -7px;
                    }
                    > *:first-of-type {
                      margin-left: 0;
                    }
                  `}
                >
                  {data.participants.map((participant) => {
                    return (
                      <div
                        css={css`
                          width: 20px;
                          height: 20px;
                          overflow: hidden;
                          border-radius: 50%;
                        `}
                      >
                        <Avatar src={participant.profileUrl} />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
    // <Container>
    //   <Banner>
    //     <Background url="./background1.jpeg" />
    //     <p>여행을 계획해 보세요.</p>
    //   </Banner>
    //   <Content />
    // </Container>
  );
};

export default Main;