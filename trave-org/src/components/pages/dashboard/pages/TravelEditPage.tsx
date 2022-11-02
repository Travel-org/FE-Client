import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import { BiPlus, BiCalendar, BiMapPin, BiPointer } from "react-icons/bi";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { css } from "@emotion/react";
import { useParams } from "react-router-dom";
import { api, IScheduleResponse } from "@src/app/api/api";
import axios from "axios";
import ListProto from "@pages/dashboard/components/timeline/ListProto";
import SplitBill from "@pages/dashboard/components/timeline/SplitBill";
import CreateTravelDateModal from "@pages/dashboard/CreateTravelDateModal";
import styled from "@emotion/styled";
import { useAppDispatch } from "@src/app/hooks";
import travelApi from "@src/app/api/travelApi";
import _ from "lodash";
import TextAvatar from "@src/components/atoms/textAvatar";
import socketClient, { Socket } from "socket.io-client";
import { RootState, store } from "@src/app/store";
import { theme } from "@src/styles/theme";
import SearchModal from "@src/components/organisms/searchModal";
import produce from "immer";
import ImageFeed from "../components/imageFeed";

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

const dummyCenter = {
  lat: 37.49091340540493,
  lng: 127.03337782299037,
};

const TravelEditPage = () => {
  const { travelId } = useParams<"travelId">();

  const client = useRef<Socket>();
  const dispatch = useAppDispatch();

  const [sharedCursors, setSharedCursors] = useState<{
    [ownerId: string]: { lat: number; lng: number };
  }>({});

  useEffect(() => {
    console.log(sharedCursors);
  }, [sharedCursors]);

  useEffect(() => {
    const socket = socketClient("http://123.214.75.32:9999/", {
      transports: ["websocket"],
      auth: {
        token: store.getState().auth.token,
      },
      query: {
        travelId: travelId,
        userId: 1,
      },
    });

    socket.on("scheduleOrderChanged", (message) => {
      dispatch(
        travelApi.util.updateQueryData("getTravel", travelId!, (draft) => {
          draft.dates.find(
            (date) => date.date === message.date
          )!.scheduleOrders = message.scheduleOrder;
        })
      );
    });

    socket.on("scheduleAdded", (message) => {
      console.log("scheduleAdded", message);
    });

    socket.on(
      "mapCursorChanged",
      (message: { ownerId: number; data: { lat: number; lng: number } }) => {
        console.log("mapCursorChanged", message);
        setSharedCursors(
          produce((draft) => {
            draft[message.ownerId] = message.data;
          })
        );
      }
    );

    client.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const [type, setType] = useState("schedule");

  const { data: travelData } = travelApi.useGetTravelQuery(travelId!);
  const [updateScheduleOrder] =
    travelApi.useChangeTravelScheduleOrderMutation();

  const [map, setMap] = useState<any>();

  const [selectedDate, setSelectedDate] = useState<string>("");
  useEffect(() => {
    if (travelData === undefined) return;

    if (selectedDate === "") {
      setSelectedDate(travelData.dates[0].date);
    }
  }, [travelData, selectedDate]);

  const selectedDateSchedules = useMemo(() => {
    if (!travelData || !selectedDate) return [];

    const selectedDateData = travelData.dates.find(
      (date) => date.date === selectedDate
    );

    if (!selectedDateData) return [];

    return selectedDateData.scheduleOrders.map(
      (scheduleId) =>
        selectedDateData.schedules.find(
          (schedule) => schedule.scheduleId === scheduleId
        )!
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

      return routeResponse.data ?? undefined;
    }

    const promises: Promise<any>[] = [];
    for (let i = 0; i < selectedDateSchedules.length - 1; i += 1) {
      const origin = selectedDateSchedules[i];
      const destination = selectedDateSchedules[i + 1];
      promises.push(
        getRoute(
          origin?.place.lat,
          origin?.place.lng,
          destination?.place.lat,
          destination?.place.lng
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
  }, [selectedDateSchedules]);

  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const bounds = useMemo(() => {
    if (selectedDateSchedules.length === 0) {
      return undefined;
    }

    const latlngbounds = new kakao.maps.LatLngBounds();

    selectedDateSchedules.forEach((travelLocation) => {
      travelLocation !== undefined &&
        latlngbounds.extend(
          new kakao.maps.LatLng(
            travelLocation?.place.lat,
            travelLocation?.place.lng
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
  const [createScheduleModalOpened, setCreateScheduleModalOpened] =
    useState(false);

  const openCreateScheduleModal = useCallback(() => {
    setCreateScheduleModalOpened(true);
  }, []);

  const closeCreateScheduleModal = useCallback(() => {
    setCreateScheduleModalOpened(false);
  }, []);

  const openCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(true);
  }, []);

  const closeCreateDateModal = useCallback(() => {
    setCreateDateModalOpened(false);
  }, []);

  const [createSchedule, result] = travelApi.useCreateScheduleMutation();

  const mouseMoveOnMapEvent = useCallback(
    _.throttle((target, mouseEvent) => {
      console.log(mouseEvent.latLng);
      client.current?.emit("mapCursorChange", {
        travelId: travelId!,
        data: {
          lat: mouseEvent.latLng.getLat(),
          lng: mouseEvent.latLng.getLng(),
        },
      });
    }, 10),
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
          width: 28vw;
          background: white;
          position: relative;
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
          {[
            {
              type: "schedule",
              title: "일정",
            },
            {
              type: "image",
              title: "사진",
            },
            {
              type: "settlement",
              title: "정산",
            },
          ].map((info) => (
            <Button
              state={type === info.type}
              onClick={() => setType(info.type)}
            >
              {info.title}
            </Button>
          ))}
        </BtnWarpper>

        {type === "schedule" && (
          // <Schedule travelData={travelData} travelId={travelId} />
          <>
            <div
              css={css`
                display: flex;
                flex-direction: row;
              `}
            >
              {createDateModalOpened && (
                <CreateTravelDateModal
                  travelId={travelId!}
                  onClose={closeCreateDateModal}
                  onSuccess={closeCreateDateModal}
                />
              )}
              {createScheduleModalOpened && (
                <SearchModal
                  selectedDate={selectedDate}
                  travelId={travelId!}
                  onClose={closeCreateScheduleModal}
                  onSuccess={closeCreateScheduleModal}
                />
              )}
            </div>
            <div
              css={css`
                width: 30vw;
                white-space: nowrap;
                overflow: auto;
              `}
            >
              {travelData.dates.map((dateData, i) => (
                <button
                  css={css`
                    background: white;
                    border: none;
                    margin: 1rem;
                    font-weight: 600;
                    border-bottom: ${dateData.date === selectedDate
                      ? `3px solid #5fe1eb`
                      : `none`};
                    p:nth-child(1) {
                      display: block;
                    }
                    p:nth-child(2) {
                      display: none;
                    }
                    cursor: pointer;
                    :hover {
                      opacity: 50%;
                      p:nth-child(1) {
                        display: none;
                      }
                      p:nth-child(2) {
                        display: block;
                      }
                    }
                  `}
                  key={dateData.date}
                  onClick={(e) => {
                    setSelectedDate(dateData.date);
                  }}
                >
                  <p>Day {i + 1}</p>
                  <p>{dateData.date}</p>
                </button>
              ))}
            </div>
            <ListProto
              travelId={travelId!}
              data={selectedDateSchedules}
              updateData={(updatedData: IScheduleResponse[]) => {
                const updatedScheduleOrder = updatedData.map(
                  (data) => data.scheduleId
                );

                updateScheduleOrder({
                  travelId: travelId!,
                  date: selectedDate!,
                  scheduleOrder: updatedScheduleOrder,
                });
                dispatch(
                  travelApi.util.updateQueryData(
                    "getTravel",
                    travelId!,
                    (draft) => {
                      draft.dates.find(
                        (date) => date.date === selectedDate
                        )!.scheduleOrders = updatedData.map((data) => data.scheduleId);
                      }
                      )
                    );
                    client.current!.emit("scheduleOrderChange", {
                      travelId: travelId!,
                      data: {
                        date: selectedDate!,
                        scheduleOrder: updatedData.map((data) => data.scheduleId),
                      },
                    });
              }}
            />
            <div
              css={css`
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                cursor: pointer;
                border-radius: 100vw;
                display: flex;
                background: white;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                box-shadow: 0px 0px 3px ${theme.colors.shadow};
                :hover {
                  div:nth-child(1) {
                    visibility: visible;
                    display: flex;
                  }
                }
              `}
            >
              <div
                css={css`
                  visibility: hidden;
                  display: none;
                  row-gap: 1rem;
                  justify-content: center;
                  flex-direction: column;
                  padding: 1rem 0px;
                `}
              >
                <BiMapPin onClick={openCreateScheduleModal} />
                <BiCalendar onClick={openCreateDateModal} />
              </div>
              <div
                css={css`
                  border-radius: 100vw;
                  display: flex;
                  justify-content: center;
                  box-shadow: 0px 0px 3px ${theme.colors.shadow};
                  padding: 1rem;
                `}
              >
                <BiPlus />
              </div>
            </div>
          </>
        )}
        {type === "image" && (
          <ImageFeed travelId={travelId} travelData={travelData} />
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
          center={dummyCenter}
          onMouseMove={mouseMoveOnMapEvent}
          style={{ width: "100%", height: "100%" }}
        >
          {Object.entries(sharedCursors).map(([k, v]) => (
            <CustomOverlayMap position={v}>
              <div>
                <BiPointer color="purple" size={24} />
                {k}
              </div>
            </CustomOverlayMap>
          ))}
          {seletedPosition && (
            <MapMarker // 마커를 생성합니다
              position={seletedPosition}
            />
          )}
          {selectedDateSchedules.map((schedule) => (
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: schedule?.place.lat ?? 0,
                lng: schedule?.place.lng ?? 0,
              }}
            >
              <div>{schedule?.place.placeName}</div>
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