import {
  Loader,
  Map,
  MapMarker,
  Polyline,
  useInjectKakaoMapApi,
} from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { KAKAO_API_APPLICATION_JAVASCRIPT_KEY } from "@src/constants";

function TravelEditPage() {
  const [map, setMap] = useState<any>();

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

  return (
    <div>
      {/* FIXME: 현재 라이브러리 문제로 Map 자동 Refresh가 안됨 Optional 처리해야함 */}
      {!loading && (
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
          style={{ height: "92vh" }}
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
      )}
    </div>
  );
}

export default TravelEditPage;