import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // eslint-disable-line
import ScheduleBoard from "@atoms/scheduleBoard";
import { useEffect, useState } from "react";
import { travelLocations } from "@pages/liveSchedule/dummyData";
import { api } from "@src/app/api/api";
import { useAppDispatch } from "@src/app/hooks";
import travelApi from "@src/app/api/travelApi";
import { DashBaordStyle, ScheduleContainer, AddButton } from "./styles";

interface Props {
  map: any;
  travelId: string | undefined;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: () => void;
  setInnerDashBoardOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashBoard = ({
  map,
  travelId,
  setMarkers,
  deleteMarker,
  setInnerDashBoardOnOff,
}: Props) => {
  const dispatch = useAppDispatch();

  const { data: travelData } = travelApi.useGetTravelQuery(travelId!);
  const { data, isLoading, error } = travelApi.useGetScheduleQuery(travelId!);

  function handleOnDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const draggingItemIndex = result.source.index;
    const dropItemIndex = result.destination.index;

    console.log("from", draggingItemIndex);
    console.log("to", dropItemIndex);
    dispatch(
      travelApi.util.updateQueryData("getTravel", travelId!, (draft) => {
        const removeForm = draft.schedules.splice(draggingItemIndex, 1);
        draft.schedules.splice(dropItemIndex, 0, removeForm[0]);
      })
    );
  }

  useEffect(() => {
    if (data === undefined || kakao === undefined) return;
    data.map(() => {
      deleteMarker();
      data.map(({ place: { lat, lng, placeName } }: any, index: number) => {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.transCoord(
          lat,
          lng,
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const marker = new kakao.maps.Marker({
                title: placeName,
                position: new kakao.maps.LatLng(result[0].y, result[0].x),
              });

              marker.setMap(map);
              setMarkers((v) => [...v, marker]);
            }
          },
          {
            input_coord: kakao.maps.services.Coords.WGS84,
            output_coord: kakao.maps.services.Coords.WTM,
          }
        );
      });
    });
  }, [data]);

  return (
    <DashBaordStyle>
      <h2>어디론가 떠나는 여행</h2>
      <ScheduleContainer>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                {travelData !== undefined &&
                  travelData.schedules.map(({ place, scheduleId }, index) => (
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
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScheduleContainer>
      <div>
        <AddButton onClick={() => setInnerDashBoardOnOff(true)}>
          + 일정 추가하기
        </AddButton>
      </div>
      <p>이동거리 : 82km</p>
      <p>소요시간 : 4시간 27분</p>
    </DashBaordStyle>
  );
};
export default DashBoard;