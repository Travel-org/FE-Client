import socket from "@utils/socket";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useKakaoInit } from "@src/utils/libs/useKakaoInit";
import DashBoard from "@organisms/dashBoard";
import InnerDashBoard from "@organisms/dashBoard/inner";
import Map from "@organisms/map";

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

const LiveSchedule = () => {
  const [kakao, setKakao] = useState<any>(window.kakao);
  const [roomCode, setRoomCode] = useState("");
  const [innerDashBoardOnOff, setInnerDashBoardOnOff] = useState(false);
  const [focusMark, setFocusMark] = useState({ x: 33.450701, y: 126.570667 });
  const [map, setMap] = useState<any>();
  const [marks, setMarks] = useState<any[]>([]);
  const [userList, setUserList] = useState({});
  const navigate = useNavigate();

  useKakaoInit(kakao, setKakao);

  const handleLeaveRoom = () => {
    socket.emit("LEAVE_ROOM", roomCode, ({ status, message }: SocketProps) => {
      console.log(message);
      status === "SUCESS" && navigate("/");
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
    return;
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

  useEffect(() => {
    if (map === undefined) return;
    marks?.map((element) => element.setMap(null));
  }, [map]);

  return (
    <>
      <Container>
        <DashBoard setInnerDashBoardOnOff={setInnerDashBoardOnOff} />
        {innerDashBoardOnOff && (
          <InnerDashBoard
            map={map}
            kakao={kakao}
            setInnerDashBoardOnOff={setInnerDashBoardOnOff}
          />
        )}
        <Map kakao={kakao} focusMark={focusMark} setMap={setMap} />
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
      </Container>
    </>
  );
};
export default LiveSchedule;