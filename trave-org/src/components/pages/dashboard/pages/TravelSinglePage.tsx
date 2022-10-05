import { useParams } from "react-router-dom";
import { api } from "@src/app/api";

function TravelSinglePage() {
  const { travelId } = useParams<"travelId">();

  const { data: travelData } = api.useGetTravelQuery(travelId!);
  return <div>Travel Single Page {travelId}; {JSON.stringify(travelData)}</div>;
}

export default TravelSinglePage;