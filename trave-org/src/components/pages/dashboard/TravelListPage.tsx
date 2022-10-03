import { api } from "@src/app/api";

function TravelListPage() {
  const { data: travelsData } = api.useGetTravelsQuery();

  return (
    <div>
      {travelsData &&
        travelsData.map((travelData) => (
          <div>
            <div>{travelData.title}</div>
          </div>
        ))}
    </div>
  );
}

export default TravelListPage;