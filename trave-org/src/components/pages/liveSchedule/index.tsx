import socket from "@utils/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useKakaoInit from "@src/utils/libs/useKakaoInit";
import DashBoard from "@organisms/dashBoard";
import InnerDashBoard from "@organisms/dashBoard/inner";
import { css } from "@emotion/react";
import { theme } from "@styles/theme";
import styled from "@emotion/styled";
import axios from "axios";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";
import { Container } from "./styles";


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

const LiveSchedule = () => {
  const [innerDashBoardOnOff, setInnerDashBoardOnOff] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [map, setMap] = useState<any>();
  const [userList, setUserList] = useState({});
  const navigate = useNavigate();

  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const handleLeaveRoom = () => {
    socket.emit("LEAVE_ROOM", roomCode, ({ status, message }: SocketProps) => {
      console.log(message);
      if (status === "SUCESS") {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    socket.on("CLIENT_MOVE", (data: any) => {
      setUserList(data);
    });
    document.addEventListener("mousemove", (event) => {
      setRoomCode((v) => {
        socket.emit("MOUSE_MOVE", v, { x: event.pageX, y: event.pageY });
        return v;
      });
    }); 
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("CREATE_ROOM", ({ status, message, code }: SocketProps) => {
      setRoomCode(code);
      console.log(message, code);
    });
  }, []);

  useEffect(() => {
    if (roomCode === "") return;
    socket.emit("JOIN_ROOM", roomCode, ({ status, message }: SocketProps) => {
      console.log(message, roomCode);
    });
  }, [roomCode]);

  const isKakaoMapScriptInitialized = useKakaoInit();

  return (
    <>
      <Container
        css={css`
          display: flex;
          > * {
            margin: 10px 10px;
          }
          > *:first-of-type {
            margin-left: 20px;
          }
          > *:last-of-type {
            margin-right: 20px;
          }
        `}
      >
        <div
          css={css`
            min-width: 15vw;
            border-radius: 25px;
            box-shadow: 0px 40px 64px -32px rgb(15 15 15 / 10%);
          `}
        >
          <DashBoard setInnerDashBoardOnOff={setInnerDashBoardOnOff} />
          {innerDashBoardOnOff && (
            <InnerDashBoard
              map={map}
              setInnerDashBoardOnOff={setInnerDashBoardOnOff}
            />
          )}
        </div>

        <div
          css={css`
            width: 100%;
            border-radius: 25px;
            position: relative;
          `}
        >
          {isKakaoMapScriptInitialized && (
            <>
              <Map
                onCreate={(internalKakaoMap) => {
                  setMap(internalKakaoMap);
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
              {Object.entries(userList)
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
                ))}
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
                    src={
                      "https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                    }
                    style={{
                      border: "solid",
                      borderColor: "black",
                    }}
                  />
                  <Avatar
                    src={
                      "https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                    }
                    style={{
                      border: "solid",
                      borderColor: "blue",
                    }}
                  />
                  <Avatar
                    src={
                      "https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                    }
                    style={{
                      border: "solid",
                      borderColor: "red",
                    }}
                  />
                </div>
              </div>

              <div
                css={css`
                  width: 70%;
                  height: 100px;
                  border-radius: 25px;
                  background: white;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 10px;
                  margin-top: auto;
                  margin-left: auto;
                  margin-right: auto;
                  z-index: 1000;
                  box-shadow: 0px 40px 64px -32px rgb(15 15 15 / 10%);
                `}
              ></div>
            </>
          )}
        </div>
      </Container>
    </>
  );
};
export default LiveSchedule;