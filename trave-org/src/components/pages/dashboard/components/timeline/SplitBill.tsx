import { css } from "@emotion/react";
import { useState } from "react";
import styled from "@emotion/styled";
import { api } from "@src/app/api/api";
import CostElement from "@src/components/organisms/costElement";
import Modal from "@src/components/modal";
import AddCostModal from "@src/components/organisms/addCostModal";
import { theme } from "@src/styles/theme";
import { BiTrash } from "react-icons/bi";

const Button = styled.button<{ isDelete: boolean }>`
  position: absolute;
  right: 0px;
  border: 0.1rem solid grey;
  border-radius: 10px;
  top: 50%;
  transform: translate(-50%, 0%);
  width: 3rem;
  height: 1.2rem;
  padding: 0.1rem 0px;
  font-size: smaller;
  display: ${({ isDelete }) => (isDelete ? "block" : "none")};
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

interface Props {
  costData: any[];
  travelId: string | undefined;
}

const SplitBill = ({ costData, travelId }: Props) => {
  console.log(costData);
  const [createCost] = api.useCreateCostMutation();
  const { data: users } = api.useGetUsersQuery(travelId!);
  const [isModalOpen, setIsModalOpen] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteCosts, setDeleteCosts] = useState<string[]>([]);
  const [deleteCost] = api.useDeleteCostMutation();
  const [amount] = useState(10000);
  const [val, setVal] = useState(10000);

  const handleSelectCostDelete = (id: string) => {
    if (deleteCosts.includes(id))
      setDeleteCosts(deleteCosts.filter((v) => v !== id));
    else setDeleteCosts([...deleteCosts, id]);
  };

  const handleDelete = async () => {
    for (let costId of deleteCosts) {
      await deleteCost({ travelId: travelId!, costId });
    }
    setIsDelete(false);
  };

  return (
    <>
      <div
        css={css`
          width: 100%;
          position: relative;
          align-items: center;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: relative;
            padding: 1rem;
            align-items: center;
          `}
        >
          <BiTrash
            css={css`
              position: absolute;
              border: 0.1rem solid grey;
              border-radius: 10px;
              top: 50%;
              transform: translate(-50%, 0%);
              transition: all 0.5s ease-out;
              right: ${isDelete ? "4rem" : "0px"};
              width: 3rem;
              height: 1.2rem;
              padding: 0.1rem 0px;
              cursor: pointer;
              :hover {
                opacity: 50%;
              }
            `}
            onClick={() => setIsDelete((v) => !v)}
          />
          <Button isDelete={isDelete} onClick={handleDelete}>
            확인
          </Button>
        </div>
        <div
          css={css`
            height: 60vh;
            overflow: auto;
            padding: 1rem;
            box-sizing: border-box;
            display: flex;
            row-gap: 1rem;
            flex-direction: column;
          `}
        >
          {costData.map((data) => (
            <CostElement
              users={users}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              handleSelectCostDelete={handleSelectCostDelete}
              isDelete={isDelete}
              data={data}
              travelId={travelId!}
            />
          ))}
        </div>
        <button
          css={css`
            display: flex;
            position: absolute;
            bottom: 1rem;
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
          onClick={() => setIsModalOpen(-2)}
        >
          +
        </button>
      </div>
      {isModalOpen === -2 && (
        <Modal onClick={() => setIsModalOpen(-1)}>
          <AddCostModal
            travelId={travelId}
            users={users}
            isClose={() => setIsModalOpen(-1)}
          />
        </Modal>
      )}
    </>
  );
};

export default SplitBill;