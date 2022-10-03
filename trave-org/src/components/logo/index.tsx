import { css } from "@emotion/react";

const Logo = () => {
  return (
    <div css={css`
      height: 100%;
      display: flex;
      align-items: center;
    `}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280.22 207.32" css={css`
        height: 100%;
        width: 50px;`}>
        <path strokeLinecap={"round"}
              stroke={"#1E52E2"}
              fill={"transparent"}
              strokeLinejoin={"round"}
              strokeWidth={"16px"}
              d="M111.7,176.78l-24.79,23.54-.17-34.82c-.07-13.27,14.21-21.68,25.78-15.19l59.29,33.24L273.22,7,7,89.7l66.77,36.72c6.89,3.79,15.29,3.58,21.99-.54L222.8,47.67" />
      </svg>
      <div css={css`
        color: #1E52E2;
        font-weight: 700;
        font-size: 30px;
        letter-spacing: -3px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      `}>
        Travely
      </div>
    </div>
  )
}

export default Logo;