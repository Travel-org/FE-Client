import { css } from "@emotion/react";

export function LogoImage({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280.22 207.32"
      css={css`
        height: 100%;
        width: 50px;
      `}
    >
      <path
        strokeLinecap="round"
        stroke={color}
        fill="transparent"
        strokeLinejoin="round"
        strokeWidth="16px"
        d="M111.7,176.78l-24.79,23.54-.17-34.82c-.07-13.27,14.21-21.68,25.78-15.19l59.29,33.24L273.22,7,7,89.7l66.77,36.72c6.89,3.79,15.29,3.58,21.99-.54L222.8,47.67"
      />
    </svg>
  );
}

export function Logo({ color }: { color: string }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <LogoImage color={color} />
      <div
        css={css`
          color: ${color};
          font-weight: 700;
          font-size: 30px;
          letter-spacing: -3px;

          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        `}
      >
        Travely
      </div>
    </div>
  );
}