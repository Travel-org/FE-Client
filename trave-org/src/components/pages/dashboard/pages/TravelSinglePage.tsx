import { Link, NavLink, useParams } from "react-router-dom";
import { api } from "@src/app/api";
import { css } from "@emotion/react";
import { Avatar } from "@pages/liveSchedule";
import React, { useCallback, useMemo, useState } from "react";
import {
  Map,
  MapMarker,
  Polyline,
  useInjectKakaoMapApi,
} from "react-kakao-maps-sdk";
import { travelLocations, travelPaths } from "@pages/liveSchedule/dummyData";

function TravelSinglePage() {
  const { travelId } = useParams<"travelId">();
  const { data: travelData } = api.useGetTravelQuery(travelId!);
  const [createSchedule, result] = api.useCreateScheduleMutation();

  const [map, setMap] = useState<any>();

  const onMapCreated = useCallback((internalKakaoMap) => {
    setMap(internalKakaoMap);
    const bounds = new kakao.maps.LatLngBounds();

    travelLocations.forEach((travelLocation) => {
      bounds.extend(
        new kakao.maps.LatLng(
          travelLocation.lnglat[1],
          travelLocation.lnglat[0]
        )
      );
    });
    internalKakaoMap.setBounds(bounds!);
  }, []);

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
        <button
          onClick={() =>
            createSchedule({
              travelId: parseInt(travelId!),
              place: {
                placeUrl: "",
                placeName: "남산타워",
                addressName: "address",
                addressRoadName: "aa",
                lat: 126.98822659999999,
                lng: 37.5511694,
                kakaoMapId: 1,
                phoneNumber: "000",
              },
              userIds: [1],
              endTime: "2022-05-23T13:30:07.247Z",
              startTime: "2022-05-23T13:30:07.247Z",
            })
          }
        >
          create schedule 1
        </button>
        <button
          onClick={() =>
            createSchedule({
              travelId: parseInt(travelId!),
              place: {
                placeUrl: "",
                placeName: "강남역",
                addressName: "address",
                addressRoadName: "aa",
                lat: 127.0116218,
                lng: 37.4789929,
                kakaoMapId: 2,
                phoneNumber: "000",
              },
              userIds: [1],
              endTime: "2022-05-23T13:30:07.247Z",
              startTime: "2022-05-23T13:30:07.247Z",
            })
          }
        >
          create schedule 2
        </button>
      </div>
      <NavLink to={`/settlement/${travelId}`}>
        <div
          css={css`
            background: antiquewhite;
            border-radius: 10px;
            height: 150px;
          `}
        >
          <div>지출 예상 금액: 100,000</div>
          <div>현재 지출 금액: 80,000</div>
          <div>내 납부 금액: 20,000</div>
          <div>내 납부 완료: 20,000</div>
          <div>내 납부 필요: 20,000</div>
        </div>
      </NavLink>
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
        <Link to="edit">
          <div>일정 수정하기</div>
        </Link>
        {/* FIXME: 현재 라이브러리 문제로 Map 자동 Refresh가 안됨 Optional 처리해야함 */}
        <Map
          onCreate={onMapCreated}
          center={{
            lat: travelLocations[0].lnglat[1],
            lng: travelLocations[0].lnglat[0],
          }}
          draggable={false}
          zoomable={false}
          style={{ height: "30vh" }}
        >
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
      
      <div
        css={css`
          display: flex;
          flex-direction: column;
          background: lightgrey;
          height: 700px;
        `}
      >
        {travelData &&
           travelData.schedules.map((schedule) => (
            <div>{schedule.place.placeName}</div>
          ))}
      </div>
    </div>
  );
}
export default TravelSinglePage;