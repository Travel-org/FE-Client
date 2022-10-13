import { css } from "@emotion/react";
import { useState } from "react";

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

function TextAvatar({ name }: { name: string }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        color: black;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      `}
      style={{
        background: stringToColor(name),
      }}
    >
      {name.substring(0, 1)}
    </div>
  );
}
function SplitBill() {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div
      css={css`
        height: 500px;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        onClick={() => setIsExpand(!isExpand)}
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 24px;
          width: 350px;
          background-color: rgba(255, 255, 255);
          border-radius: 6px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
        `}
      >
        <div>
          <TextAvatar name="손진혁" />
        </div>

        <div>
          <div>CU 우만파크점</div>
          <div>24,000 원</div>
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: row;
            > * {
              margin-left: -10px;
              border: 2px solid white;
            }
          `}
        >
          <TextAvatar name="박상혁" />
          <TextAvatar name="차재명" />
          <TextAvatar name="이호용" />
        </div>

        {isExpand && <div style={{ height: "500px" }}>ttseste</div>}
      </div>
    </div>
  );
}

export default SplitBill;