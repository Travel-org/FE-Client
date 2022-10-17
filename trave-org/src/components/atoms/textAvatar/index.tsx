import { css } from "@emotion/react";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = ((hash >> (i * 8)) & 155) + 100;
    colour += `00${value.toString(16)}`.slice(-2);
  }
  console.log(colour);
  return colour;
}

const TextAvatar = ({
  name,
  size = 1,
  width = "2rem",
  height = "2rem",
}: {
  name: string;
  size?: number;
  width?: string;
  height?: string;
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: ${size}rem;
        font-weight: 600;
        color: black;
        width: ${width};
        height: ${height};
        border-radius: 50%;
      `}
      style={{
        background: stringToColor(name),
      }}
    >
      {name.substring(0, 1)}
    </div>
  );
};

export default TextAvatar;