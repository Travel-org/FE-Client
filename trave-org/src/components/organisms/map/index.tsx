import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

interface Props {
  kakao: any;
  setMap: React.Dispatch<any>;
  focusMark: { x: number; y: number };
  //   mark: { name: string; x: number; y: number }[];
}

const Container = styled.div`
  width: 80vw;
  height: 92vh;
`;

const Map = ({ kakao, setMap, focusMark }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleFocusMark = () => {
    const options = {
      center: new kakao.maps.LatLng(focusMark.x, focusMark.y),
      level: 3,
    };
    setMap(new kakao.maps.Map(ref.current, options));
  };

  useEffect(() => {
    if (kakao && kakao.maps) handleFocusMark();
  }, [kakao]);

  return <Container id="map" ref={ref} />;
};

export default Map;