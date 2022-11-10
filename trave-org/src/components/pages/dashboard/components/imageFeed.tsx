import { css } from "@emotion/react";
import UploadFeedModal from "@src/components/organisms/uploadFeedModal";
import UploadImageModal from "@src/components/organisms/uploadImageModal";
import { theme } from "@src/styles/theme";
import { useCallback, useEffect, useState } from "react";
import { BiCommentAdd, BiPlus } from "react-icons/bi";

interface Props {
  travelData: any;
  travelId: string | undefined;
}
const Marker = ({ children }: { children: any }) => {
  return (
    <div
      css={css`
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        background: #00cae9;
        transform: rotate(-45deg);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <span
        css={css`
          transform: rotate(45deg);
        `}
      >
        {children}
      </span>
    </div>
  );
};

const ImageFeed = ({ travelData, travelId }: Props) => {
  const [createDateImageOpened, setCreateImageModalOpened] = useState(false);
  const [createFeedOpened, setCreateFeedOpened] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const openCreateFeedModal = useCallback((id: string) => {
    setScheduleId(id);
    setCreateFeedOpened(true);
  }, []);

  const closeCreateFeedModal = useCallback(() => {
    setScheduleId("");
    setCreateFeedOpened(false);
  }, []);
  const openCreateImageModal = useCallback((id: string) => {
    setScheduleId(id);
    setCreateImageModalOpened(true);
  }, []);
  const closeCreateImageModal = useCallback(() => {
    setScheduleId("");
    setCreateImageModalOpened(false);
  }, []);
  const reOrderedData = (selectedDate) =>
    travelData.dates
      .filter((v) => v.date === selectedDate)[0]
      .schedules.reduce((r, v) => {
        r[v.scheduleId] = v;
        return r;
      }, {});
  useEffect(() => {
    if (travelData === undefined) return;
    setSelectedDate(travelData.dates[0].date);
  }, [travelData]);
  return (
    <>
      {createDateImageOpened && (
        <UploadImageModal
          travelId={travelId!}
          scheduleId={scheduleId}
          onClose={closeCreateImageModal}
          onSuccess={closeCreateImageModal}
        />
      )}
      {createFeedOpened && (
        <UploadFeedModal
          travelId={travelId!}
          scheduleId={scheduleId}
          onClose={closeCreateFeedModal}
          onSuccess={closeCreateFeedModal}
        />
      )}
      <div
        css={css`
          width: 30vw;
          white-space: nowrap;
          overflow: auto;
        `}
      >
        {travelData.dates.map((dateData, i) => (
          <button
            css={css`
              background: white;
              border: none;
              margin: 1rem;
              font-weight: 600;
              border-bottom: ${dateData.date === selectedDate
                ? `3px solid #5fe1eb`
                : `none`};
              p:nth-child(1) {
                display: block;
              }
              p:nth-child(2) {
                display: none;
              }
              cursor: pointer;
              :hover {
                opacity: 50%;
                p:nth-child(1) {
                  display: none;
                }
                p:nth-child(2) {
                  display: block;
                }
              }
            `}
            key={dateData.date}
            onClick={(e) => {
              setSelectedDate(dateData.date);
            }}
          >
            <p>Day {i + 1}</p>
            <p>{dateData.date}</p>
          </button>
        ))}
      </div>
      <div
        css={css`
          padding: 2rem;
          height: 50vh;
          width: 100%;
          overflow: auto;
        `}
      >
        {selectedDate !== "" &&
          travelData.dates
            .filter((v) => v.date === selectedDate)[0]
            .scheduleOrders.map((id, index) => {
              const data = reOrderedData(selectedDate)[id];
              console.log(data);
              return (
                <>
                  <div
                    css={css`
                      width: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      border-radius: 10px;
                      padding: 1rem;
                      box-shadow: 0px 0px 3px ${theme.colors.shadow};
                    `}
                  >
                    <Marker>{index + 1}</Marker>
                    <div
                      css={css`
                        display: flex;
                        flex-grow: 1;
                        flex-direction: column;
                        * {
                          margin: 0px;
                        }
                      `}
                    >
                      <strong>
                        <p>{data.place.placeName}</p>
                      </strong>
                      <p>{data.place.addressName}</p>
                    </div>
                    <BiCommentAdd
                      css={css`
                        width: 1.2rem;
                        height: 1.2rem;
                        cursor: pointer;
                        :hover {
                          opacity: 50%;
                        }
                      `}
                      onClick={() => openCreateFeedModal(data.scheduleId)}
                    />
                  </div>
                  <div
                    css={css`
                      padding: 1rem;
                      display: grid;
                      grid-template-columns: repeat(5, 1fr);
                      gap: 1rem;
                    `}
                  >
                    {data.photos.map(
                      ({ schedulePhotoId, schedulePhotoPath }) => (
                        <div
                          key={schedulePhotoId}
                          css={css`
                            width: 3rem;
                            height: 3rem;
                            background-image: url(${schedulePhotoPath});
                            background-position: center;
                            background-size: cover;
                          `}
                        />
                      )
                    )}
                    <div
                      css={css`
                        width: 3rem;
                        height: 3rem;
                        background: whitesmoke;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        :hover {
                          opacity: 50%;
                        }
                      `}
                      onClick={() => openCreateImageModal(data.scheduleId)}
                    >
                      <BiPlus />
                    </div>
                  </div>
                </>
              );
            })}
      </div>
    </>
  );
};
export default ImageFeed;