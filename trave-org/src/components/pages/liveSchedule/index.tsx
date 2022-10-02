import socket from "@utils/socket";
import { useNavigate } from "react-router-dom";
import { createElement, useEffect, useLayoutEffect, useState } from "react";
import { Container, Empty } from "./styles";
import DashBoard from "@organisms/dashBoard";

import Map from "@organisms/map";
interface SocketProps {
  status: string;
  message: string;
  code: string;
}

const LiveSchedule = () => {
  const [roomCode, setRoomCode] = useState("");
  const [focusMark, setFocusMark] = useState({ x: 33.450701, y: 126.570667 });
  const navigate = useNavigate();
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

  return (
    <>
      <p>{roomCode}</p>
      {/* <button>나가기</button> */}
      <Container>
        <DashBoard />
        <Map focusMark={focusMark} />
      </Container>
    </>
  );
};
export default LiveSchedule;