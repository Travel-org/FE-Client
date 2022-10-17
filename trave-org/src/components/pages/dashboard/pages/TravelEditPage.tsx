import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { travelLocations } from "@pages/liveSchedule/dummyData";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InnerDashBoard from "@organisms/dashBoard/inner";
import { css } from "@emotion/react";
import LabelBtn from "@src/components/atoms/button/label";
import { useParams } from "react-router-dom";
import { api, IScheduleResponse } from "@src/app/api/api";
import axios from "axios";
import ListProto from "@pages/dashboard/components/timeline/ListProto";
import SplitBill from "@pages/dashboard/components/timeline/SplitBill";
import CreateTravelDateModal from "@pages/dashboard/CreateTravelDateModal";
import { Avartar } from "@src/components/organisms/scheduleElement/styles";
import styled from "@emotion/styled";
import { useAppDispatch } from "@src/app/hooks";
import travelApi from "@src/app/api/travelApi";
import _ from "lodash";
import TextAvatar from "@src/components/atoms/textAvatar";
import Schedule from "../components/schedule";

const BtnWarpper = styled.div`
  width: 100%;
  background: #e8e8e8; ;
`;

const Button = styled.button<{ state: boolean }>`
  padding: 1rem;
  border: none;
  border-radius: 10px 10px 0px 0px;
  background: ${({ state }) => (state ? "white" : "none")};
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

const TravelEditPage = () => {
  const [type, setType] = useState<"schedule" | "image" | "settlement">(
    "schedule"
  );
  const dispatch = useAppDispatch();

  const { travelId } = useParams<"travelId">();
  const { data: travelData } = travelApi.useGetTravelQuery(travelId!);
  const [updateScheduleOrder] =
    travelApi.useChangeTravelScheduleOrderMutation();

  const [map, setMap] = useState<any>();

  const [selectedDate, setSelectedDate] = useState<null | string>(null);

  const selectedDateSchedules = useMemo(() => {
    if (!travelData || !selectedDate) return [];

    const selectedDateData = travelData.dates.find(
      (date) => date.date === selectedDate
    );

    if (!selectedDateData) return [];

    return selectedDateData.scheduleOrders.map((scheduleId) =>
      selectedDateData.schedules.find(
        (schedule) => schedule.scheduleId === scheduleId
      )
    );
  }, [travelData, selectedDate]);

  /**
   * Update Route Info Data
   */
  const [routeInfos, setRouteInfos] = useState<any[]>();
  useEffect(() => {
    if (!travelData) {
      return;
    }

    async function getRoute(origLat, origLng, destLat, destLng) {
      const routeResponse = await axios.get(
        "http://123.214.75.32:18080/ors/v2/directions/driving-car",
        {
          params: {
            start: `${origLng},${origLat}`,
            end: `${destLng},${destLat}`,
          },
        }
      );

      return routeResponse.data;
    }

    const promises: Promise<any>[] = [];
    for (let i = 0; i < selectedDateSchedules.length - 1; i += 1) {
      const origin = selectedDateSchedules[i];
      const destination = selectedDateSchedules[i + 1];
      promises.push(
        getRoute(
          origin.place.lat,
          origin.place.lng,
          destination.place.lat,
          destination.place.lng
        )
      );
    }

    Promise.all(promises).then((result) => {
      setRouteInfos(
        result.map((r) => ({
          type: "driving",
          distance: r.features[0].properties.summary.distance,
          duration: r.features[0].properties.summary.distance,
          path: r.features[0].geometry.coordinates,
        }))
      );
    });
  }, [travelData]);

  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const bounds = useMemo(() => {
    if (selectedDateSchedules.length === 0) {
      return undefined;
    }

    const latlngbounds = new kakao.maps.LatLngBounds();

    selectedDateSchedules.forEach((travelLocation) => {
      latlngbounds.extend(
        new kakao.maps.LatLng(
          travelLocation.place.lat,
          travelLocation.place.lng
        )
      );
    });

    return latlngbounds;
  }, [selectedDateSchedules]);

  const onMapCreated = useCallback(
    (internalKakaoMap) => {
      setMap(internalKakaoMap);

      if (bounds) {
        internalKakaoMap.setBounds(bounds);
      }
    },
    [bounds]
  );

  const onMapClicked = useCallback((target, mouseEvent) => {
    const clickedLat = mouseEvent.latLng?.getLat();
    const clickedLng = mouseEvent.latLng?.getLng();

    if (clickedLat && clickedLng) {
      setSelectedPosition({
        lat: clickedLat,
        lng: clickedLng,
      });
    }
  }, []);

  const [markers, setMarkers] = useState<any[]>([]);
  function deleteMarker() {
    markers.map((v) => v.setMap(null));
    setMarkers([]);
  }

  const [createDateModalOpened, setCreateDateModalOpened] = useState(false);

  const openCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(true);
  }, []);

  const closeCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(false);
  }, []);

  const [createSplitBillModalOpened, setCreateSplitBillModalOpened] =
    useState(false);

  const [createSchedule, result] = api.useCreateScheduleMutation();

  const mouseMoveOnMapEvent = useCallback(
    _.throttle((target, mouseEvent) => {
      console.log(mouseEvent.latLng);
    }, 500),
    []
  );

  if (!travelData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          min-width: 28vw;
          background: white;
        `}
      >
        <div
          css={css`
            padding: 2rem;
            display: flex;
            flex-direction: column;
            background: #e8e8e8;
          `}
        >
          <h3>여행 제목입니다!</h3>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            {travelData.users.map(({ userId, userName }) => (
              <TextAvatar key={userId} name={userName} />
            ))}
          </div>
        </div>
        <BtnWarpper>
          <Button
            state={type === "schedule"}
            onClick={() => setType("schedule")}
          >
            일정
          </Button>
          <Button state={type === "image"} onClick={() => setType("image")}>
            사진
          </Button>
          <Button
            state={type === "settlement"}
            onClick={() => setType("settlement")}
          >
            정산
          </Button>
        </BtnWarpper>
        <div
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
        <div>{travelData.title}</div>
        <div>{travelData.users.map((user) => user.userName)}</div>
        <button
          onClick={() =>
            createSchedule({
              travelId: travelId!,
              date: selectedDate!,
              place: {
                placeUrl: "",
                placeName: "남산타워",
                addressName: "서울 남산타워",
                addressRoadName: "aa",
                lat: 37.5511694,
                lng: 126.98822659999999,
                kakaoMapId: 13,
                phoneNumber: "000",
              },
              userIds: [13],
              endTime: "13:30:07",
              startTime: "13:30:07",
            })
          }
        >
          남산타워
        </button>
        <button
          onClick={() =>
            createSchedule({
              travelId: travelId!,
              date: selectedDate!,
              place: {
                placeUrl: "",
                placeName: "강남역",
                addressName: "address",
                addressRoadName: "강남역",
                lat: 37.498779319598455,
                lng: 127.02753687427264,
                kakaoMapId: 14,
                phoneNumber: "000",
              },
              userIds: [13],
              endTime: "13:30:07",
              startTime: "13:30:07",
            })
          }
        >
          강남역
        </button>
        <button
          onClick={() =>
            createSchedule({
              travelId: travelId!,
              date: selectedDate!,
              place: {
                placeUrl: "",
                placeName: "사당역",
                addressName: "address",
                addressRoadName: "사당역",
                lat: 37.47715678758263,
                lng: 126.98085975641106,
                kakaoMapId: 15,
                phoneNumber: "000",
              },
              userIds: [13],
              endTime: "13:30:07",
              startTime: "13:30:07",
            })
          }
        >
          사당역
        </button>
        <div>
          {travelData.dates.map((dateData) => (
            <button
              key={dateData.date}
              onClick={(e) => {
                setSelectedDate(dateData.date);
              }}
            >
              {dateData.date}
            </button>
          ))}
        </div>

        {/*  */}
        {type === "schedule" && (
          // <Schedule travelData={travelData} travelId={travelId} />
          <ListProto
            data={selectedDateSchedules}
            updateData={(updatedData: IScheduleResponse[]) => {
              console.log("Outer Update Data", updatedData);
              updateScheduleOrder({
                travelId: travelId!,
                date: selectedDate!,
                scheduleOrder: updatedData.map((data) => data.scheduleId),
              });
              dispatch(
                travelApi.util.updateQueryData(
                  "getTravel",
                  travelId!,
                  (draft) => {
                    draft.dates.find(
                      (date) => date.date === selectedDate
                    )!.schedules = updatedData;
                  }
                )
              );
            }}
          />
        )}
        {type === "settlement" && (
          <SplitBill costData={travelData.costs} travelId={travelId} />
        )}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          position: relative;
        `}
      />
      <div
        css={css`
          flex-grow: 1;
        `}
      >
        <Map
          onCreate={onMapCreated}
          onClick={onMapClicked}
          center={{
            lat: travelLocations[0].lnglat[1],
            lng: travelLocations[0].lnglat[0],
          }}
          onMouseMove={mouseMoveOnMapEvent}
          style={{ width: "100%", height: "100%" }}
        >
          {seletedPosition && (
            <MapMarker // 마커를 생성합니다
              position={seletedPosition}
            />
          )}
          {selectedDateSchedules.map((schedule) => (
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: schedule.place.lat,
                lng: schedule.place.lng,
              }}
            >
              <div>{schedule.place.placeName}</div>
            </MapMarker>
          ))}
          {routeInfos &&
            routeInfos.map((routeInfo) => (
              <Polyline
                path={routeInfo.path.map(([lng, lat]) => ({
                  lat: lat,
                  lng: lng,
                }))}
              />
            ))}
        </Map>
      </div>
    </div>
  );
};

export default TravelEditPage;