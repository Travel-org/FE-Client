import {
  Map,
  MapMarker,
  Polyline,
  useInjectKakaoMapApi,
} from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { KAKAO_API_APPLICATION_JAVASCRIPT_KEY } from "@src/constants";
import DashBoard from "@organisms/dashBoard";
import InnerDashBoard from "@organisms/dashBoard/inner";
import { css } from "@emotion/react";
import LabelBtn from "@src/components/atoms/button/label";
import { useParams } from "react-router-dom";
import { api } from "@src/app/api";

function TravelEditPage() {
  const { travelId } = useParams<"travelId">();
  const { data: travelData } = api.useGetTravelQuery(travelId!);
  const [map, setMap] = useState<any>();
  const [type, setType] = useState<"search" | "recommend">("search");
  const { loading, error } = useInjectKakaoMapApi({
    appkey: KAKAO_API_APPLICATION_JAVASCRIPT_KEY,
    libraries: ["services"],
  });
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const bounds = useMemo(() => {
    if (loading) return undefined;
    const latlngbounds = new kakao.maps.LatLngBounds();
    travelLocations.forEach((travelLocation) => {
      latlngbounds.extend(
        new kakao.maps.LatLng(
          travelLocation.lnglat[1],
          travelLocation.lnglat[0]
        )
      );
    });
    return latlngbounds;
  }, [loading]);
  const onMapCreated = useCallback(
    (internalKakaoMap) => {
      console.log("created");
      setMap(internalKakaoMap);
      internalKakaoMap.setBounds(bounds!);
      console.log(internalKakaoMap);
    },
    [bounds]
  );
  const onMapClicked = useCallback((target, mouseEvent) => {
    const clickedLat = mouseEvent.latLng?.getLat();
    const clickedLng = mouseEvent.latLng?.getLng();
    if (clickedLat && clickedLng) {
      setSelectedPosition({
        lat: clickedLat,
        lng: clickedLng,
      });
    }
  }, []);

  const [innerDashBoardOnOff, setInnerDashBoardOnOff] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  function deleteMarker() {
    markers.map((v) => v.setMap(null));
    setMarkers([]);
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
        <div
        css={css`
          display: flex;
          flex-direction: row;
          position: relative;
        `}
      >
        <DashBoard
          travelId={travelId}
          setInnerDashBoardOnOff={setInnerDashBoardOnOff}
        />
        {innerDashBoardOnOff && (
          <InnerDashBoard
            travelData={travelData}
            type={type}
            map={map}
            setMarkers={setMarkers}
            deleteMarker={deleteMarker}
          />
        )}

        {innerDashBoardOnOff && (
          <div
            css={css`
              position: absolute;
              right: -2rem;
              z-index: 3;
            `}
          >
            <LabelBtn
              url="/cancel.svg"
              onClick={() => {
                setInnerDashBoardOnOff(false);
                deleteMarker();
              }}
            />
            <LabelBtn url="/search.svg" onClick={() => setType("search")} />
            <LabelBtn
              url="/recommend.svg"
              onClick={() => setType("recommend")}
            />
          </div>
        )}
      </div>
      {/* FIXME: 현재 라이브러리 문제로 Map 자동 Refresh가 안됨 Optional 처리해야함 */}
      {!loading && (
        <div
          css={css`
            flex-grow: 1;
          `}
        >
          <Map
            onCreate={onMapCreated}
            onClick={onMapClicked}
            center={{
              lat: travelLocations[0].lnglat[1],
              lng: travelLocations[0].lnglat[0],
            }}
            onDragEnd={(internalMap) => {
              console.log(internalMap.getCenter());
            }}
            style={{ width: "100%", height: "100%" }}
          >
            {seletedPosition && (
              <MapMarker // 마커를 생성합니다
                position={seletedPosition}
              />
            )}

            {travelLocations.map((travelLocation) => (
              <MapMarker // 마커를 생성합니다
                position={{
                  // 마커가 표시될 위치입니다
                  lat: travelLocation.lnglat[1],
                  lng: travelLocation.lnglat[0],
                }}
              >
                <div>{travelLocation.title}</div>
              </MapMarker>
            ))}

            <Polyline
              path={travelPaths.map((travelPath) => ({
                lat: travelPath[1],
                lng: travelPath[0],
              }))}
            />
          </Map>
        </div>
      )}
    </div>
  );
}

export default TravelEditPage;