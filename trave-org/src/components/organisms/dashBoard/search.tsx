import { api, ITravelResponse } from "@src/app/api/api";
import travelApi from "@src/app/api/travelApi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Wrapper, SearchContainer, SearchItem } from "./styles";

interface Props {
  travelData: ITravelResponse | undefined;
  map: any;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: Function;
  socket: Socket;
}

const SearchBoard: React.FC<Props> = ({
  map,
  travelData,
  deleteMarker,
  setMarkers,
  socket,
}) => {
  const InputRef = useRef<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [selectItem, setSelectItem] = useState<any>({});
  const [createSchedule, { data }] = travelApi.useCreateScheduleMutation();
  const [ps, setPs] = useState<any>();

  useEffect(() => {
    if (map) {
      setPs(new kakao.maps.services.Places(map));
    }
  }, [kakao]);

  const handleCreateSchedule = () => {
    if (selectItem?.id !== undefined) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.transCoord(
        selectItem.x,
        selectItem.y,
        (result, status) => {
          if (status === kakao.maps.services.Status.OK)
            createSchedule({
              travelId: travelData?.id,
              endTime: "2022-05-23T13:30:07.247Z",
              startTime: "2022-05-23T13:30:07.247Z",
              userIds: travelData?.users.map((user) => user.userId),
              place: {
                addressName: selectItem.address_name,
                addressRoadName: selectItem.road_address_name,
                kakaoMapId: selectItem.id,
                phoneNumber: selectItem.phone,
                placeName: selectItem.place_name,
                placeUrl: selectItem.place_url,
                lat: result[0].x,
                lng: result[0].y,
              },
            } as any);
        },
        {
          input_coord: kakao.maps.services.Coords.WTM,
          output_coord: kakao.maps.services.Coords.WGS84,
        }
      );
    }
  };

  function placesSearchCB(data: any, status: any, pagination: any) {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResult(data);
      deleteMarker();
      data.map(({ x, y, place_name }: any, index: number) => {
        const marker = new kakao.maps.Marker({
          title: place_name,
          position: new kakao.maps.LatLng(y, x),
        });
        marker.setMap(map);
        setMarkers((v) => [...v, marker]);
        if (index === 0) map.panTo(new kakao.maps.LatLng(y, x));
      });
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
    }
  }
  const handleSearch = () => {
    if (InputRef.current === undefined) return;
    ps.keywordSearch(InputRef.current.value, placesSearchCB);
  };
  return (
    <>
      <Wrapper>
        <h2>여행지 검색</h2>
      </Wrapper>
      <input
        ref={(el) => (InputRef.current = el as HTMLInputElement)}
        onBlur={handleSearch}
      />
      <SearchContainer>
        {searchResult.map((searchItem) => {
          const { x, y } = searchItem;
          console.log(searchItem);
          return (
            <SearchItem
              key={searchItem}
              selected={selectItem === searchItem}
              onClick={() => {
                map.panTo(new kakao.maps.LatLng(y, x));
                setSelectItem(searchItem);
              }}
            >
              <p>{searchItem.place_name}</p>
              <p>{searchItem.address_name}</p>
            </SearchItem>
          );
        })}
      </SearchContainer>
      {searchResult.length > 0 && (
        <button onClick={handleCreateSchedule}>확인</button>
      )}
    </>
  );
};
export default SearchBoard;