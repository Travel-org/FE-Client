import { useEffect, useState } from "react";
import { InnerDashBoardStyle, PastButton } from "./styles";
import SearchBoard from "./search";
import RecommandDashBoard from "./recommend";

interface Props {
  map: any;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: () => void;
}

const InnerDashBoard = ({ map, deleteMarker, setMarkers }: Props) => {
  const [type, setType] = useState("search");

  const changeRecommandPage = () => setType("recommand");

  return (
    <InnerDashBoardStyle>
      {type === "recommand" && <PastButton onClick={() => setType("search")} />}
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