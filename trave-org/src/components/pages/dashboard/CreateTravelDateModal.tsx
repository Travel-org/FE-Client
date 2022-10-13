import Modal from "@src/components/modal";
import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BiX } from "react-icons/bi";
import { api } from "@src/app/api";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface ICreateTravelDateModalProps {
  travelId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const formatDate = (date: Date) => {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return [year, month, day].join("-");
};

const CreateTravelDateModal: React.FC<ICreateTravelDateModalProps> = ({
  travelId,
  onClose,
  onSuccess,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [createTravelDate, { error, isSuccess, isLoading }] =
    api.useCreateTravelDateMutation();

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  return (
    <Modal>
      <div
        css={css`
          background: white;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          > * {
            padding: 25px 30px;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 20px;
              font-weight: 600;
            `}
          >
            날짜 생성하기
          </span>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </div>
        <div
          css={css`
            height: 80px;
            background: deepskyblue;
          `}
        >
          <button type="button" onClick={onClose}>
            취소
          </button>
          <button
            type="button"
            onClick={() =>
              createTravelDate({
                travelId: travelId,
                date: formatDate(selectedDate),
                title: "test",
              })
            }
          >
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTravelDateModal;