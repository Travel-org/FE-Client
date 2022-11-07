import { jsx, css } from "@emotion/react";
import Cookies from "js-cookie";

import Board from "@organisms/board";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Wrapper, SubmitBtn, ArrowImg } from "./styles";
import { LLink } from "@pages/admin";

// const tempData = {
//   title: "예비군 동원 훈련",
//   dates: "5월 15일 - 5월 15일",
//   participants: [
//     {
//       profileUrl:
//         "https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg",
//     },
//     {
//       profileUrl:
//         "https://yt3.ggpht.com/TYUWqBP6XRBWhEIC8VmVUMt4I2vMtrcVgqvVDD2oGUy8SCMSQrjE4ZgSN0DmF8dNT4VCBHoR=s900-c-k-c0x00ffffff-no-rj",
//     },
//     {
//       profileUrl:
//         "https://blog.kakaocdn.net/dn/chGFjc/btqNF9OW8LC/aRSsqBE0Gp2VpjoCoZhr21/img.jpg",
//     },
//     {
//       profileUrl:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/253px-Donald_Trump_official_portrait.jpg",
//     },
//   ],
// };

// const datas = [
//   tempData,
//   tempData,
//   tempData,
//   tempData,
//   tempData,
//   tempData,
//   tempData,
//   tempData,
// ];

// const Avatar = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const Main2 = () => {
//   const [width, setWidth] = useState(0);
//   const ref = useRef<any>();

//   useEffect(() => {
//     setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
//   }, []);

//   return (
//     <div
//       css={css`
//         align-items: center;
//         margin: 0px 10px;
//       `}
//     >
//       <div
//         css={css`
//           font-size: 24px;
//           font-weight: 500;
//         `}
//       >
//         다가오는 계획
//       </div>
//       <motion.div
//         ref={ref}
//         css={css`
//           cursor: grab;
//           overflow: hidden;
//         `}
//       >
//         <motion.div
//           drag="x"
//           dragConstraints={{ right: 0, left: -width }}
//           css={css`
//             display: flex;

//             > * {
//               margin: 0px 10px;
//             }
//             > *:first-of-type {
//               margin-left: 0;
//             }
//             > *:last-of-type {
//               margin-right: 0;
//             }
//           `}
//         >
//           {datas.map((data, i) => {
//             return (
//               <motion.div
//                 key={i}
//                 css={css`
//                   width: 100px;
//                   min-width: 100px;
//                   padding: 10px;
//                   background: white;
//                   border-radius: 15px;
//                   display: flex;
//                   flex-direction: column;
//                 `}
//               >
//                 <div
//                   css={css`
//                     height: 80px;
//                     background: lightgrey;
//                     border-radius: 10px;
//                     margin-bottom: 5px;
//                   `}
//                 >
//                   <img
//                     src={
//                       "https://img.khan.co.kr/news/2022/01/02/l_2022010201000132500007231.jpg"
//                     }
//                     style={{
//                       height: "100%",
//                       borderRadius: "10px",
//                       width: "100%",
//                     }}
//                   />
//                 </div>
//                 <span
//                   css={css`
//                     font-weight: 500;
//                     font-size: 14px;
//                   `}
//                 >
//                   {data.title}
//                 </span>
//                 <span
//                   css={css`
//                     font-weight: 400;
//                     font-size: 10px;
//                     color: #939393;
//                   `}
//                 >
//                   {data.dates}
//                 </span>

//                 <div
//                   css={css`
//                     display: flex;

//                     > * {
//                       margin-left: -7px;
//                     }
//                     > *:first-of-type {
//                       margin-left: 0;
//                     }
//                   `}
//                 >
//                   {data.participants.map((participant) => {
//                     return (
//                       <div
//                         css={css`
//                           width: 20px;
//                           height: 20px;
//                           overflow: hidden;
//                           border-radius: 50%;
//                         `}
//                       >
//                         <Avatar src={participant.profileUrl} />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </motion.div>
//     </div>
//     // <Container>
//     //   <Banner>
//     //     <Background url="./background1.jpeg" />
//     //     <p>여행을 계획해 보세요.</p>
//     //   </Banner>
//     //   <Content />
//     // </Container>
//   );
// };

const Main = () => {
  const navigate = useNavigate();

  return (
    <div
      css={css`
        margin: 0 auto;
      `}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: "easeOut",
          duration: 1,
        }}
        css={css`
          position: relative;
        `}
      >
        <img
          src="https://www.kagoshima-kankou.com/storage/tourism_themes/12/responsive_images/ElwnvZ2u5uZda7Pjcwlk4mMtr08kLNydT8zXA6Ie__1673_1115.jpeg"
          css={css`
            margin-left: 40%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 300px 100%);

            width: 60%;
            height: 800px;
            max-height: 800px;
            object-fit: cover;
          `}
        />
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            padding: 145px 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            style={{
              fontSize: "5rem",
              fontWeight: "600",
              color: "#23262F",
              marginBottom: "20px",
            }}
          >
            지금 여행을
            <br />
            계획해보세요
          </motion.div>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            css={css`
              font-size: 2.5rem;
              font-weight: 500;
              color: #23262f;
            `}
          >
            여러 사람들과 함께 계획을 세워보세요.
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 1 }}
            css={css`
              margin-top: 60px;
            `}
          >
            <LLink
              to={"/dashboard"}
              css={css`
                color: white;
                font-size: 18px;
                font-weight: 500;
                transform: none;
                background-color: #1e52e2;
                border-radius: 100px;
                height: 56px;
                min-width: 56px;
                padding: 12px 24px;
              `}
            >
              시작하기
            </LLink>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Main;