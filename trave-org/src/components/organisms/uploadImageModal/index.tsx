import { css } from "@emotion/react";
import travelApi from "@src/app/api/travelApi";
import { theme } from "@src/styles/theme";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import Modal from "@src/components/modal";

interface IUploadImageModalProps {
  travelId: string;
  scheduleId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const UploadImageModal = ({
  travelId,
  scheduleId,
  onClose,
  onSuccess,
}: IUploadImageModalProps) => {
  const [image, setImage] = useState<{ preview: string; raw: any }[]>([]);
  console.log(scheduleId);
  const [uploadImage, { error, isSuccess, isLoading }] =
    travelApi.useUploadSchedulePhotosMutation();

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
    const photos = new FormData();
    for (let i in image) {
      photos.append("photos", image[i].raw);
    }
    uploadImage({ travelId, scheduleId, photos });
    onClose();
  };
  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);
  return (
    <Modal onClick={onClose}>
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
        <h3>사진을 업로드 해보세요!</h3>
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

export default UploadImageModal;