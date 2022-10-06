import { useParams } from "react-router-dom";
import { api } from "@src/app/api";
import { css } from "@emotion/react";
import { Avatar } from "@pages/liveSchedule";
import React, { useMemo, useState } from "react";
import useKakaoInit from "@utils/libs/useKakaoInit";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";

function TravelSinglePage() {
  const { travelId } = useParams<"travelId">();

  const { data: travelData } = api.useGetTravelQuery(travelId!);
  const isKakaoMapScriptInitialized = useKakaoInit();
  const [map, setMap] = useState<any>();
  const [seletedPosition, setSelectedPosition] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const bounds = useMemo(() => {
    if (!isKakaoMapScriptInitialized) return undefined;

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
  }, [isKakaoMapScriptInitialized]);
  return (
    <div
      css={css`
        padding: 24px;
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(4, 1fr);
      `}
    >
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        <div>여행 A</div>

        <div>2022-05-20 ~ 2022-05-23</div>
      </div>

      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        asdf
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        참여자
        {travelData &&
          travelData.users.map((userData) => (
            <Avatar key={userData.userId} style={{ background: "black" }} />
          ))}
      </div>
      <div
        css={css`
          background: antiquewhite;
          border-radius: 10px;
          height: 150px;
        `}
      >
        asdf
        {travelData?.startDate} ~ {travelData?.endDate}
      </div>
      <div
        css={css`
          width: 100%;
          border-radius: 25px;
          position: relative;
        `}
      >
        {isKakaoMapScriptInitialized && (
          <>
            <Map
              onCreate={(internalKakaoMap) => {
                setMap(internalKakaoMap);
                internalKakaoMap.setBounds(bounds!);
                console.log(internalKakaoMap);
              }}
              onClick={(target, mouseEvent) => {
                const clickedLat = mouseEvent.latLng?.getLat();
                const clickedLng = mouseEvent.latLng?.getLng();

                if (clickedLat && clickedLng) {
                  setSelectedPosition({
                    lat: clickedLat,
                    lng: clickedLng,
                  });
                }
              }}
              center={{
                lat: travelLocations[0].lnglat[1],
                lng: travelLocations[0].lnglat[0],
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
            {/* {Object.entries(userList) */}
            {/*  .filter(([k, v]) => k !== socket.id) */}
            {/*  .map(([key, { x, y, rgb }]: any) => ( */}
            {/*    <div */}
            {/*      style={{ */}
            {/*        zIndex: "999", */}
            {/*        position: "absolute", */}
            {/*        top: y, */}
            {/*        left: x, */}
            {/*      }} */}
            {/*    > */}
            {/*      <svg */}
            {/*        width="16" */}
            {/*        height="18" */}
            {/*        viewBox="0 0 8 9" */}
            {/*        fill="none" */}
            {/*        xmlns="http://www.w3.org/2000/svg" */}
            {/*      > */}
            {/*        <path */}
            {/*          d="M2.225 1.80302L4 1.79923V0.708313L0.5 0.708313V4.49998H1.507L1.5105 2.57706L6.7855 8.29165L7.5 7.5176L2.225 1.80302Z" */}
            {/*          fill={rgb} */}
            {/*        /> */}
            {/*      </svg> */}
            {/*    </div> */}
            {/*  ))} */}
            <div
              css={css`
                position: absolute;
                top: 10px;
                left: auto;
                right: 10px;
                bottom: auto;
                margin-bottom: auto;
                margin-left: auto;
                margin-right: auto;
                z-index: 1000;
              `}
            >
              <div
                css={css`
                  > * {
                    margin: 5px 5px;
                  }
                  > *:first-of-type {
                    margin-left: 0px;
                  }
                  > *:last-of-type {
                    margin-right: 0px;
                  }
                `}
              >
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "black",
                  }}
                />
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "blue",
                  }}
                />
                <Avatar
                  src="https://pbs.twimg.com/profile_images/798463233774350336/KlHqUNgL_400x400.jpg"
                  style={{
                    border: "solid",
                    borderColor: "red",
                  }}
                />
              </div>
            </div>

            <div
              css={css`
                width: 70%;
                height: 100px;
                border-radius: 25px;
                background: white;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 10px;
                margin-top: auto;
                margin-left: auto;
                margin-right: auto;
                z-index: 1000;
                box-shadow: 0px 40px 64px -32px rgb(15 15 15 / 10%);
              `}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TravelSinglePage;