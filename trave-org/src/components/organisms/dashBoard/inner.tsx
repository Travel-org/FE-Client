import { useEffect, useState } from "react";
import { InnerDashBoardStyle, PastButton } from "./styles";
import SearchBoard from "./search";
import RecommandDashBoard from "./recommend";
import { ITravelResponse } from "@src/app/api/api";

interface Props {
  travelData: ITravelResponse | undefined;
  type: "search" | "recommend";
  map: any;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: () => void;
}

const InnerDashBoard = ({
  type,
  travelData,
  map,
  deleteMarker,
  setMarkers,
}: Props) => {
  return (
    <InnerDashBoardStyle>
      {type === "search" && (
        <SearchBoard
          map={map}
          travelData={travelData}
          deleteMarker={deleteMarker}
          setMarkers={setMarkers}
        />
      )}
      {type === "recommend" && <RecommandDashBoard />}
    </InnerDashBoardStyle>
  );
};
export default InnerDashBoard;