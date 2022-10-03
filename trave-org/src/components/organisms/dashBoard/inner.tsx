import { useEffect, useState } from "react";
import { InnerDashBoardStyle, CancelButton, PastButton } from "./styles";
import SearchBoard from "./search";
import RecommandDashBoard from "./recommend";

interface Props {
  map: any;

  setInnerDashBoardOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}

const InnerDashBoard = ({ map, setInnerDashBoardOnOff }: Props) => {
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