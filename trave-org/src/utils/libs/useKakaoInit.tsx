import { useEffect, useState } from "react";
import { KAKAO_API_KEY } from "@src/constants";

function useKakaoInit() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.onload = () => window.kakao.maps.load(() => setIsScriptLoaded(true));

    script.type = "text/javascript";
    script.src = KAKAO_API_KEY;
    document.head.appendChild(script);
  }, []);

  return isScriptLoaded;
}

export default useKakaoInit;