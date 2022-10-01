import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

interface Props {
  focusMark: { x: number; y: number };
  //   mark: { name: string; x: number; y: number }[];
}

const Container = styled.div`
  width: 80vw;
  height: 92vh;
`;

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = ({ focusMark }: Props) => {
  const maps = window.kakao.maps;
  const [marks, setMarks] = useState<any[]>();
  const [map, setMap] = useState();
  const ref = useRef<HTMLDivElement>(null);
  const options = {
    center: new maps.LatLng(focusMark.x, focusMark.y),
    level: 3,
  };

  useEffect(() => {
    setMap(new maps.Map(ref.current, options));
  }, [focusMark]);

  useEffect(() => {
    if (map === undefined) return;
    marks?.map((element) => element.setMap(null));
    // setMarks(
    //   mark.map((element) => {
    //     const marker = new maps.Marker({
    //       position: new maps.LatLng(element.y, element.x),
    //     });
    //     marker.setMap(map);
    //     return marker;
    //   })
    // );
  }, [map]);

  return <Container id="map" ref={ref} />;
};

export default Map;