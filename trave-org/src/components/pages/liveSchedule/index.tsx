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
  const navigate = useNavigate();

  useKakaoInit(kakao, setKakao);

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
      </Container>
    </>
  );
};
export default LiveSchedule;

// const handleLeaveRoom = () => {
//   socket.emit("LEAVE_ROOM", roomCode, ({ status, message }: SocketProps) => {
//     console.log(message);
//     status === "SUCESS" && navigate("/");
//   });
// };

// useEffect(() => {
//   document.addEventListener("mousemove", (event) => {
//     console.log(
//       "pageX: ",
//       event.pageX,
//       "pageY: ",
//       event.pageY,
//       "clientX: ",
//       event.clientX,
//       "clientY:",
//       event.clientY
//     );
//     // socket.emit("MOUSE_MOVE", roomCode, { x: "", y: "" });
//   });
//   return;
// });

// useEffect(() => {
//   socket.connect();
//   socket.emit("CREATE_ROOM", ({ status, message, code }: SocketProps) => {
//     setRoomCode(code);
//     console.log(message);
//   });
// }, []);

// useEffect(() => {
//   if (roomCode === "") return;
//   socket.emit("JOIN_ROOM", roomCode, ({ status, message }: SocketProps) => {
//     console.log(message);
//   });
// }, [roomCode]);