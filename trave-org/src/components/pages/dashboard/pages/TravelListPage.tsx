import { api } from "@src/app/api";
import { NavLink } from "react-router-dom";
import { ScheduleElement } from "@organisms/scheduleElement";
import { css } from "@emotion/react";
import CreateTravelModal from "@pages/dashboard/CreateTravelModal";
import { useCallback, useState } from "react";

const TravelListPage = () => {
  const { data: travelsData } = api.useGetTravelsQuery();

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
        <CreateTravelModal
          onClose={closeCreateTravelModal}
          onSuccess={closeCreateTravelModal}
        />
      )}
      <div>
        <button onClick={openCreateTravelModal}>새 여행 추가</button>

        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          `}
        >
          {travelsData?.content !== undefined &&
            travelsData?.content.map(
              ({ id, title, startDate, users, endDate }) => (
                <NavLink to={id.toString()}>
                  <div>
                    <ScheduleElement
                      title={title}
                      users={users}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                </NavLink>
              )
            )}
        </div>
      </div>
    </>
  );
};

export default TravelListPage;