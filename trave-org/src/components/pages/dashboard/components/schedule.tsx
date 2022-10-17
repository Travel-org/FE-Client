import { css } from "@emotion/react";
import { api, IScheduleResponse, ITravelResponse } from "@src/app/api/api";
import travelApi from "@src/app/api/travelApi";
import ScheduleBoard from "@src/components/atoms/scheduleBoard";
import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CreateTravelDateModal from "../CreateTravelDateModal";

interface Props {
  travelData: ITravelResponse;
  travelId: string | undefined;
}

const Schedule = ({ travelData, travelId }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    travelData.dates[0].date
  );
  const [createDateModalOpened, setCreateDateModalOpened] = useState(false);

  const getScheduleOrders = (selectedDate) =>
    travelData.dates.filter(({ date }) => date === selectedDate)[0]
      .scheduleOrders;
  const getScheduleById = (selectedDate) =>
    travelData.dates
      .filter(({ date }) => date === selectedDate)[0]
      .schedules.reduce((r: any, v) => {
        r[v.scheduleId] = v;
        return r;
      }, []);

  useEffect(() => {
    console.log(travelData.dates);
  }, [travelData]);

  const openCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(true);
  }, []);

  const closeCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(false);
  }, []);

  const [createSplitBillModalOpened, setCreateSplitBillModalOpened] =
    useState(false);

  const [createSchedule, result] = travelApi.useCreateScheduleMutation();
  if (!travelData) {
    return <div>Loading...</div>;
  }

  function handleOnDragEnd() {}
  return (
    <>
      {/* <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <button onClick={openCreateDateModal}>open date create modal</button>
        {createDateModalOpened && (
          <CreateTravelDateModal
            travelId={travelId!}
            onClose={closeCreateDateModal}
            onSuccess={closeCreateDateModal}
          />
        )}
      </div>
      <button
        onClick={() =>
          createSchedule({
            travelId: parseInt(travelId!),
            date: selectedDate,
            place: {
              placeUrl: "",
              placeName: "222222",
              addressName: "address",
              addressRoadName: "aa",
              lat: 37.5511694,
              lng: 126.98822659999999,
              kakaoMapId: 2,
              phoneNumber: "000",
            },
            userIds: [1],
            endTime: "13:30:07",
            startTime: "13:30:07",
          })
        }
      >
        create schedule 1
      </button> */}
      <div
        css={css`
          width: 350px;
          overflow: auto;
          display: flex;
          button {
            white-space: nowrap;
          }
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      >
        {travelData.dates.map((dateData, i) => (
          <button
            css={css`
              border: none;
              background: white;
              margin: 1rem;
              cursor: pointer;
              :hover {
                opacity: 50%;
              }
              font-weight: 600;
              border-bottom: ${selectedDate === dateData.date
                ? `3px solid #5fe1eb`
                : `none`};
            `}
            key={dateData.date}
            onClick={(e) => {
              setSelectedDate(dateData.date);
            }}
          >
            {`Day ${i + 1}`}
          </button>
        ))}
      </div>
      <div
        css={css`
          padding: 1rem;
        `}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                {getScheduleOrders(selectedDate).map((id, index) => {
                  const { place, scheduleId } =
                    getScheduleById(selectedDate)[id];
                  return (
                    <Draggable
                      key={scheduleId}
                      index={index}
                      draggableId={`${scheduleId}`}
                    >
                      {(providedInner) => (
                        <div
                          ref={providedInner.innerRef}
                          {...providedInner.draggableProps}
                          {...providedInner.dragHandleProps}
                        >
                          <ScheduleBoard
                            title={place.placeName}
                            description=""
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Schedule;