import { useEffect, useState } from "react";
import { InnerDashBoardStyle, PastButton } from "./styles";
import SearchBoard from "./search";
import RecommandDashBoard from "./recommend";

interface Props {
  type: "search" | "recommend";
  map: any;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: () => void;
}

const InnerDashBoard = ({ type, map, deleteMarker, setMarkers }: Props) => {
  return (
    <InnerDashBoardStyle>
      {type === "search" && (
        <SearchBoard
          map={map}
          deleteMarker={deleteMarker}
          setMarkers={setMarkers}
        />
      )}
      {type === "recommend" && <RecommandDashBoard />}
    </InnerDashBoardStyle>
  );
};

export default InnerDashBoard;