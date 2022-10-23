import { css } from "@emotion/react";
import { width } from "@mui/system";
import postApi from "@src/app/api/postApi";
import { theme } from "@src/styles/theme";
import { useEffect, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "../modal";

interface IUploadFeedModalProps {
  travelId: string;
  scheduleId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UploadFeedModal = ({
  travelId,
  scheduleId,
  onClose,
  onSuccess,
}: IUploadFeedModalProps) => {
  const [image, setImage] = useState<{ preview: string; raw: any }[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [createpost] = postApi.useCreatePostMutation();
  useEffect(() => {
    console.log(image);
  }, [image]);

  const handleRemoveImage = (url: string) => {
    setImage(image.filter(({ preview }) => preview !== url));
  };
  const handleChange = (e: any) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      setImage((v) => [
        ...v,
        {
          preview: URL.createObjectURL(file),
          raw: file,
        },
      ]);
      e.target.value = "";
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in image) {
      formData.append("photos", image[i].raw);
    }
    formData.append("scheduleId", scheduleId);
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("text", textRef.current?.value ?? "");
    createpost(formData);
    onClose();
  };
  return (
    <Modal onClick={onClose}>
      <div
        css={css`
          position: relative;
          background: white;
          border-radius: 10px;
          width: 20vw;
          height: 60vh;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          justify-self: center;
          text-align: center;
        `}
      >
        <h3>피드를 업로드 해보세요!</h3>
        <div
          css={css`
            padding: 0.1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            column-gap: 1rem;
            width: 100%;
            overflow: auto;
          `}
        >
          <input type="file" id="upload" onChange={handleChange} hidden />
          <div>
            <label
              htmlFor="upload"
              css={css`
                width: 10vmin;
                height: 10vmin;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0px 0px 3px ${theme.colors.shadow};
              `}
            >
              <BiPlus />
            </label>
          </div>
          {image.map(({ preview }) => (
            <img
              key={preview}
              css={css`
                cursor: pointer;
                :hover {
                  opacity: 50%;
                }
                width: 10vmin;
                height: 10vmin;
              `}
              src={preview}
              onClick={() => handleRemoveImage(preview)}
              alt="img"
            />
          ))}
        </div>
        <p>제목을 입력해주세요</p>
        <input
          css={css`
            border: none;
            border-bottom: 1px solid grey;
          `}
          ref={titleRef}
          placeholder="문구"
        />
        <p>내용을 입력해주세요</p>
        <textarea
          css={css`
            border: none;
            border-bottom: 1px solid grey;
          `}
          ref={textRef}
          placeholder="입력"
        />
        <div
          css={css`
            position: absolute;
            bottom: 2rem;
            width: 80%;
            display: flex;
            justify-content: space-evenly;
          `}
        >
          <button
            css={css`
              background: white;
              border: none;
            `}
            onClick={onClose}
          >
            닫기
          </button>
          <button
            css={css`
              background: white;
              border: none;
            `}
            onClick={handleUpload}
          >
            업로드
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadFeedModal;