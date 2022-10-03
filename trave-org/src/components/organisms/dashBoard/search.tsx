import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, SearchContainer, SearchItem } from "./styles";

interface Props {
  map: any;
  setMarkers: React.Dispatch<React.SetStateAction<any[]>>;
  deleteMarker: Function;
  changeRecommandPage: () => void;
}

const SearchBoard: React.FC<Props> = ({
  map,
  changeRecommandPage,
  deleteMarker,
  setMarkers,
}) => {
  const InputRef = useRef<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [selectItem, setSelectItem] = useState<any>({});
  const [ps, setPs] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (map) {
      console.log(map);
      setPs(new map.services.Places());
    }
  }, [kakao]);

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
        <button onClick={changeRecommandPage}>추천받기</button>
      </Wrapper>
      <input
        ref={(el) => (InputRef.current = el as HTMLInputElement)}
        onBlur={handleSearch}
      />
      <SearchContainer>
        {searchResult.map((searchItem) => {
          const { x, y } = searchItem;
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
      {searchResult.length > 0 && <button>확인</button>}
    </>
  );
};
export default SearchBoard;