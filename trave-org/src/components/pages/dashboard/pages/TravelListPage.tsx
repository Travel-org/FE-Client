import { NavLink, useNavigate } from "react-router-dom";
import { ScheduleElement } from "@organisms/scheduleElement";
import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import travelApi from "@src/app/api/travelApi";
import { theme } from "@src/styles/theme";
import Modal from "@src/components/organisms/modal";
import CreateTravelModal from "@src/components/organisms/createTravelModal";

const TravelListPage = () => {
  const navigate = useNavigate();
  const { data: travelsData } = travelApi.useGetTravelsQuery();

  const [isCrateTravelModelOpened, setIsCreateTravelModalOpened] =
    useState(false);

  const openCreateTravelModal = useCallback(() => {
    setIsCreateTravelModalOpened(true);
  }, []);

  const closeCreateTravelModal = useCallback(() => {
    setIsCreateTravelModalOpened(false);
  }, []);

  return (
    <>
      {isCrateTravelModelOpened && (
        <Modal onClick={closeCreateTravelModal}>
          <CreateTravelModal onSuccess={closeCreateTravelModal} />
        </Modal>
      )}
      <div
        css={css`
          position: relative;
          padding: 2rem;
          width: calc(100vw - 250px);
          height: 100%;
        `}
      >
        <div
          css={css`
            display: grid;
            overflow: auto;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            * {
              border-bottom-style: none;
            }
          `}
        >
          {travelsData?.content !== undefined &&
            travelsData?.content.map(
              ({ id, title, users, startDate, endDate }) => (
                <div onClick={() => navigate(id.toString())}>
                  <ScheduleElement
                    title={title}
                    users={users}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
              )
            )}
        </div>
        <button
          css={css`
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            width: 3rem;
            border: none;
            height: 3rem;
            background: white;
            box-shadow: 0px 0px 6px ${theme.colors.shadow};
            padding: 1rem;
            border-radius: 100vw;
            cursor: pointer;
            :hover {
              opacity: 50%;
            }
          `}
          onClick={openCreateTravelModal}
        >
          +
        </button>
      </div>
    </>
  );
};
export default TravelListPage;
