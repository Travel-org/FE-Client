import { InnerDashBoardStyle, CancelButton, PastButton } from "./styles";
import { useEffect, useState } from "react";
import SearchBoard from "./search";
import RecommandDashBoard from "./recommend";

interface Props {
  kakao: any;
  map: any;

  setInnerDashBoardOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}

const InnerDashBoard = ({ kakao, map, setInnerDashBoardOnOff }: Props) => {
  const [type, setType] = useState("search");
  const [markers, setMarkers] = useState<any[]>([]);

  const changeRecommandPage = () => setType("recommand");

  function deleteMarker() {
    markers.map((v) => v.setMap(null));
    setMarkers([]);
  }
  return (
    <InnerDashBoardStyle>
      {type === "recommand" && <PastButton onClick={() => setType("search")} />}
      <CancelButton
        onClick={() => {
          setInnerDashBoardOnOff(false);
          deleteMarker();
        }}
      />
      {type === "search" && (
        <SearchBoard
          kakao={kakao}
          map={map}
          deleteMarker={deleteMarker}
          setMarkers={setMarkers}
          changeRecommandPage={changeRecommandPage}
        />
      )}
      {type === "recommand" && <RecommandDashBoard />}
    </InnerDashBoardStyle>
  );
};

export default InnerDashBoard;