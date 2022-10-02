import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { KAKAO_API_KEY } from "@src/constants";

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
  const [kakao, setKakao] = useState(window.kakao);
  const [marks, setMarks] = useState<any[]>();
  const [map, setMap] = useState();
  const ref = useRef<HTMLDivElement>(null);

  const handleFocusMark = () => {
    const options = {
      center: new kakao.maps.LatLng(focusMark.x, focusMark.y),
      level: 3,
    };
    setMap(new kakao.maps.Map(ref.current, options));
  };

  useEffect(() => {
    if (kakao && kakao.maps) {
      handleFocusMark();
    } else {
      const script = document.createElement("script");
      script.onload = () => {
        window.kakao.maps.load(function () {
          setKakao(window.kakao);
        });
      };
      script.type = "text/javascript";
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        KAKAO_API_KEY +
        "&autoload=false";
      document.head.appendChild(script);
    }
  }, [kakao]);

  useEffect(() => {
    if (map === undefined) return;
    marks?.map((element) => element.setMap(null));

  }, [map]);

  return <Container id="map" ref={ref} />;
};

export default Map;