import { css } from "@emotion/react";
import { Button } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import postApi from "@src/app/api/postApi";
import { useEffect, useRef, useState } from "react";

const CreateNoticeModal = (props) => {
  const { open, close } = props;
  const [image, setImage] = useState<{ preview: string; raw: any }[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [createNotice] = postApi.useCreateNoticeMutation();
  const handleChange = (e: any) => {
    if (e.target.files.length > 0) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in image) {
      formData.append("photos", image[i].raw);
    }
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("content", textRef.current?.value ?? "");
    createNotice(formData);
    close();
  };

  const handleRemoveImg = (url: string) => {
    setImage(image.filter(({ preview }) => preview !== url));
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      css={css`
        display: flex;
      `}
    >
      <div
        css={css`
          width: 400px;
          background-color: white;
          border: solid 1px black;
          margin-left: 30%;
          margin-bottom: 30px;
          padding: 10px;
        `}
      >
        <header>
          <button
            className="close"
            onClick={close}
            css={css`
              display: flex;
              margin-left: auto;
            `}
          >
            &times;
          </button>
        </header>
        <main>
          <input
            placeholder="제목을 입력하세요"
            ref={titleRef}
            css={css`
              width: 100%;
              overflow: auto;
              resize: none;
              border: none;
            `}
          />
          <textarea
            placeholder="내용을 입력하세요"
            ref={textRef}
            cols={40}
            rows={5}
            css={css`
              margin-top: 10px;
              width: 100%;
              overflow: auto;
              resize: none;
              border: none;
            `}
          ></textarea>
          {/* <Button
              variant="contained"
              component="label"
              size="small"
              startIcon={<PhotoCamera />}
            >
              Upload
              <input ref={imageRef} type="file" hidden onClick={handleChange} />
            </Button> */}
          <div>
            {image.map(({ preview }) => (
              <img
                key={preview}
                css={css`
                  width: 3rem;
                  height: 3rem;
                  :hover {
                    opacity: 50%;
                  }
                `}
                src={preview}
                onClick={() => handleRemoveImg(preview)}
              />
            ))}
          </div>
          <input type="file" onChange={handleChange} />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
          >
            작성
          </Button>
        </main>
      </div>
    </div>
  );
};

export default CreateNoticeModal;