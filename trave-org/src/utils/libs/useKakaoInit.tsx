import { useEffect } from "react";
import { KAKAO_API_KEY } from "@src/constants";

export function useKakaoInit(kakao: any, setKakao: any) {
  useEffect(() => {
    if (kakao && kakao.maps) return;
    else {
      const script = document.createElement("script");
      script.onload = () =>
        window.kakao.maps.load(() => setKakao(window.kakao));

      script.type = "text/javascript";
      script.src = KAKAO_API_KEY;
      document.head.appendChild(script);
    }
  }, [kakao]);
}