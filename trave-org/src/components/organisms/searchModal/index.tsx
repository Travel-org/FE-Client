import { css } from "@emotion/react";
import travelApi from "@src/app/api/travelApi";
import Modal from "@src/components/modal";
import { theme } from "@src/styles/theme";
import { useEffect, useState } from "react";

interface ICreateTravelScheduleModalProps {
  travelId: string;
  selectedDate: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface ScheduleProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const SearchModal = ({
  travelId,
  selectedDate,
  onClose,
  onSuccess,
}: ICreateTravelScheduleModalProps) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [targetAddress, setTargetAddress] = useState<ScheduleProps>();
  const [searchResult, setSearchResult] =
    useState<kakao.maps.services.PlacesSearchResult>();
  const [createSchedule, { error, isSuccess, isLoading }] =
    travelApi.useCreateScheduleMutation();

  const handleCreateSchedule = () => {
    if (targetAddress === undefined) return;
    console.log(targetAddress);
    createSchedule({
      travelId: travelId!,
      date: selectedDate!,
      place: {
        placeUrl: targetAddress.place_url,
        placeName: targetAddress.place_name,
        addressName: targetAddress.address_name,
        addressRoadName: targetAddress.road_address_name,
        lat: targetAddress.y,
        lng: targetAddress.x,
        kakaoMapId: Number(targetAddress.id),
        phoneNumber: targetAddress.phone,
      },
      userIds: [13],
      endTime: "13:30:07",
      startTime: "13:30:07",
    });
  };

  useEffect(() => {
    if (searchKeyword === "") {
      setSearchResult(undefined);
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(data);
      }
    });
  }, [searchKeyword]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  return (
    <Modal>
      <div
        css={css`
          position: relative;
          background: white;
          border-radius: 10px;
          width: 20vw;
          height: 40vh;
          display: flex;
          flex-direction: column;

          padding: 1rem;
        `}
      >
        <h3>장소를 입력해주세요!</h3>
        <input
          css={css`
            border-radius: 5px;
            border: none;
            box-shadow: 0px 0px 3px ${theme.colors.shadow};
          `}
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />

        <div
          css={css`
            width: 100%;
            height: 100%;
            overflow: auto;
          `}
        >
          {searchResult &&
            searchResult.map((result) => {
              return (
                <div
                  css={css`
                    padding: 1rem;
                    border-bottom: 1px solid black;
                    color: ${JSON.stringify(targetAddress) ===
                    JSON.stringify(result)
                      ? "black"
                      : "grey"};
                    cursor: pointer;
                  `}
                  onClick={() => setTargetAddress(result)}
                >
                  {result.place_name}
                </div>
              );
            })}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            button {
              background: white;
              border: none;
              padding: 1rem;
              box-sizing: border-box;
            }
          `}
        >
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button type="button" onClick={handleCreateSchedule}>
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;