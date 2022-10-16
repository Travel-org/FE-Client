import Modal from "@src/components/modal";
import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { BiX } from "react-icons/bi";
import { api } from "@src/app/api/api";
import produce from "immer";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";

interface ISignInModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTravelModal: React.FC<ISignInModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [emails, setEmails] = useState<string[]>(["", "", ""]);
  const [createTravel, { error, isSuccess, isLoading }] =
    api.useCreateTravelMutation();

  const updateEmail = useCallback((index: number, value: string) => {
    setEmails(
      produce((draft) => {
        draft[index] = value;
      })
    );
  }, []);

  const inviteMore = useCallback(() => {
    setEmails(
      produce((draft) => {
        draft.push("");
      })
    );
  }, []);

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  return (
    <Modal>
      <div
        css={css`
          width: 500px;
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
            여행 생성하기
          </span>
        </div>
        <div
          css={css`
            height: 300px;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <span>여행 제목</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
            <span>참여자</span>
            {emails.map((email, index) => (
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                `}
              >
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    updateEmail(index, e.target.value);
                  }}
                />
                <BiX />
              </div>
            ))}
            <button type="button" onClick={inviteMore}>
              더 초대하기
            </button>
          </div>
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
              createTravel({
                title: title,
                userEmails: emails.filter((email) => email !== ""),
                startDate: "",
                endDate: ""
              })
            }
          >
            생성
          </button>
        </div>
    </Modal>
  );
};

export default CreateTravelModal;