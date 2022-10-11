// import socket from "@utils/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import DashBoard from "@organisms/dashBoard";
import InnerDashBoard from "@organisms/dashBoard/inner";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Map,
  MapMarker,
  Polyline,
  useInjectKakaoMapApi,
} from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";
import { Container } from "./styles";
import { KAKAO_API_APPLICATION_JAVASCRIPT_KEY } from "@src/constants";
import LabelBtn from "@src/components/atoms/button/label";

interface SocketProps {
  status: string;
  message: string;
  code: string;
}
declare global {
  interface Window {
    kakao: any;
  }
}

export const Avatar = styled.img`
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const AvatarGroup = styled.div`
  display: flex;
`;

function LiveSchedule() {
  const [innerDashBoardOnOff, setInnerDashBoardOnOff] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [type, setType] = useState<"search" | "recommend">("search");
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any[]>([]);
  const navigate = useNavigate();

  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  function deleteMarker() {
    markers.map((v) => v.setMap(null));
    setMarkers([]);
  }

  useEffect(() => {
    console.log(innerDashBoardOnOff);
  }, [innerDashBoardOnOff]);

  const { loading, error } = useInjectKakaoMapApi({
    appkey: KAKAO_API_APPLICATION_JAVASCRIPT_KEY,
    libraries: ["services"],
  });

  const bounds = useMemo(() => {
    if (loading) return undefined;

    const latlngbounds = new kakao.maps.LatLngBounds();

    travelLocations.forEach((travelLocation) => {
      latlngbounds.extend(
        new kakao.maps.LatLng(
          travelLocation.lnglat[1],
          travelLocation.lnglat[0]
        )
      );
    });
    return latlngbounds;
  }, [loading]);

  return (
    <Container>
      <div
        css={css`
          position: absolute;
          display: flex;
          height: 92vh;
          z-index: 999;
          column-gap: 0.4rem;
          border-radius: 4px;
          padding: 0.4rem;
          box-sizing: border-box;
        `}
      >
        <DashBoard setInnerDashBoardOnOff={setInnerDashBoardOnOff} />
        {innerDashBoardOnOff && (
          <>
            <InnerDashBoard
              map={map}
              setMarkers={setMarkers}
              deleteMarker={deleteMarker}
            />
          </>
        )}
        <div>
          {innerDashBoardOnOff && (
            <>
              <LabelBtn
                url="/cancel.svg"
                onClick={() => {
                  setInnerDashBoardOnOff(false);
                  deleteMarker();
                }}
              />
              <LabelBtn url="/search.svg" onClick={() => setType("search")} />
              <LabelBtn
                url="/recommend.svg"
                onClick={() => setType("recommend")}
              />
            </>
          )}
        </div>
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
        `}
      >
        {!loading && (
          <>
            <Map
              onCreate={(internalKakaoMap) => {
                setMap(internalKakaoMap);
                internalKakaoMap.setBounds(bounds!);
                console.log(internalKakaoMap);
              }}
              onClick={(target, mouseEvent) => {
                const clickedLat = mouseEvent.latLng?.getLat();
                const clickedLng = mouseEvent.latLng?.getLng();

                if (clickedLat && clickedLng) {
                  setSelectedPosition({
                    lat: clickedLat,
                    lng: clickedLng,
                  });
                }
              }}
              center={{
                lat: travelLocations[0].lnglat[1],
                lng: travelLocations[0].lnglat[0],
              }}
              style={{ height: "92vh" }}
            >
              {seletedPosition && (
                <MapMarker // 마커를 생성합니다
                  position={seletedPosition}
                />
              )}

              {travelLocations.map((travelLocation) => (
                <MapMarker // 마커를 생성합니다
                  position={{
                    // 마커가 표시될 위치입니다
                    lat: travelLocation.lnglat[1],
                    lng: travelLocation.lnglat[0],
                  }}
                >
                  <div>{travelLocation.title}</div>
                </MapMarker>
              ))}

              <Polyline
                path={travelPaths.map((travelPath) => ({
                  lat: travelPath[1],
                  lng: travelPath[0],
                }))}
              />
            </Map>
            {/* {Object.entries(userList)
              .filter(([k, v]) => k !== socket.id)
              .map(([key, { x, y, rgb }]: any) => (
                <div
                  style={{
                    zIndex: "999",
                    position: "absolute",
                    top: y,
                    left: x,
                  }}
                >
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 8 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.225 1.80302L4 1.79923V0.708313L0.5 0.708313V4.49998H1.507L1.5105 2.57706L6.7855 8.29165L7.5 7.5176L2.225 1.80302Z"
                      fill={rgb}
                    />
                  </svg>
                </div>
              ))} */}
            <div
              css={css`
                position: absolute;
                top: 10px;
                left: auto;
                right: 10px;
                bottom: auto;
                margin-bottom: auto;
                margin-left: auto;
                margin-right: auto;
                z-index: 1000;
              `}
            >
              <div
                css={css`
                  > * {
                    margin: 5px 5px;
                  }
                  > *:first-of-type {
                    margin-left: 0px;
                  }
                  > *:last-of-type {
                    margin-right: 0px;
                  }
                `}
              >
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "black",
                  }}
                />
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "blue",
                  }}
                />
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "red",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
export default LiveSchedule;

// const handleLeaveRoom = () => {
//   socket.emit("LEAVE_ROOM", roomCode, ({ status, message }: SocketProps) => {
//     console.log(message);
//     if (status === "SUCESS") {
//       navigate("/");
//     }
//   });
// };

// useEffect(() => {
//   socket.on("CLIENT_MOVE", (data: any) => {
//     setUserList(data);
//   });
//   document.addEventListener("mousemove", (event) => {
//     setRoomCode((v) => {
//       socket.emit("MOUSE_MOVE", v, { x: event.pageX, y: event.pageY });
//       return v;
//     });
//   });
// }, []);

// useEffect(() => {
//   socket.connect();
//   socket.emit("CREATE_ROOM", ({ status, message, code }: SocketProps) => {
//     setRoomCode(code);
//     console.log(message, code);
//   });
// }, []);

// useEffect(() => {
//   if (roomCode === "") return;
//   socket.emit("JOIN_ROOM", roomCode, ({ status, message }: SocketProps) => {
//     console.log(message, roomCode);
//   });
// }, [roomCode]);
