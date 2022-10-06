import { api } from "@src/app/api";

function FriendsPage() {
  const { data: travelsData } = api.useGetTravelsQuery();

  return (
    <div>
      {travelsData &&
       travelsData.data.map((travelData) => (
          <div>
            <div>{travelData.title}</div>
          </div>
        ))}
    </div>
  );
}

export default FriendsPage;