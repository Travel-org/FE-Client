import { api } from "@src/app/api";
import { NavLink } from "react-router-dom";

function TravelListPage() {
  const { data: travelsData } = api.useGetTravelsQuery();

  const [createTravel] = api.useCreateTravelMutation();

  return (
    <div>
      {travelsData &&
        travelsData.data.map((travelData) => (
          <div>
            <NavLink to={travelData.id.toString()}>
              {travelData.title}
            </NavLink>
          </div>
        ))}
      <button
        onClick={() =>
          createTravel({
            title: "Test Title",
            startDate: "2022-05-22",
            endDate: "2022-05-23",
          })
        }
      >
        Create
      </button>
    </div>
  );
}

export default TravelListPage;