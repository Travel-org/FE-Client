import { css } from "@emotion/react";
import React, { useState } from "react";
import { api } from "@src/app/api/api";
import CostElement from "@src/components/organisms/costElement";
import Modal from "@src/components/modal";
import AddCostModal from "@src/components/organisms/addCostModal";
import { theme } from "@src/styles/theme";

interface Props {
  costData: any[];
  travelId: string | undefined;
}

const SplitBill = ({ costData, travelId }: Props) => {
  const [createCost] = api.useCreateCostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpand, setIsExpand] = useState(false);

  const [amount] = useState(10000);
  const [val, setVal] = useState(10000);

  return (
    <>
      <div
        css={css`
          width: 100%;
          position: relative;
          align-items: center;
          height: 60vh;
        `}
      >
        <div
          css={css`
            height: 100%;
            overflow: auto;
            padding: 1rem;
            box-sizing: border-box;
            display: flex;
            row-gap: 1rem;
            flex-direction: column;
          `}
        >
          {costData.map(
            ({ costId, title, content, totalAmount, userCosts, payerId }) => (
              <CostElement
                key={costId}
                title={title}
                payerId={payerId}
                content={content}
                totalAmount={totalAmount}
                userCosts={userCosts}
              />
            )
          )}
        </div>
        <button
          css={css`
            display: flex;
            position: absolute;
            bottom: 0px;
            justify-content: center;
            background: white;
            cursor: pointer;
            :hover {
              opacity: 50%;
            }
            right: 1rem;
            width: 3rem;
            height: 3rem;
            border: 0px;
            padding: 1rem;
            align-items: center;
            text-align: center;
            border-radius: 100vw;
            box-shadow: 0px 0px 6px ${theme.colors.shadow};
          `}
          onClick={() => setIsModalOpen((v) => !v)}
        >
          +
        </button>
      </div>
      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <AddCostModal
            travelId={travelId}
            isClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default SplitBill;