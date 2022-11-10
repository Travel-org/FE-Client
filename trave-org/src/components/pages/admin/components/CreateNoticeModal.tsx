import { css } from "@emotion/react";
import postApi from "@src/app/api/postApi";
import { useRef, useState } from "react";

const CreateNoticeModal = (props) => {
  const { open, close } = props;
  const [image, setImage] = useState<{ preview: string; raw: any }[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef(null);
  const [createNotice] = postApi.useCreateNoticeMutation();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i in image) {
      formData.append("photos", image[i].raw);
    }
    formData.append("title", titleRef.current?.value ?? "");
    formData.append("content", textRef.current?.value ?? "");
    createNotice(formData);
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? "openModal modal" : "modal"}
      css={css`
        display: flex;
      `}
    >
      {open ? (
        <section
          css={css`
            width: 400px;
            height: 400px;
            background-color: white;
            border: solid 1px black;
            margin-left: 30%;
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
              `}
            ></textarea>
            <input ref={imageRef} type="file" onClick={handleChange} />
            <button
              css={css`
                margin-top: 41%;
                width: 100px;
                height: 30px;
              `}
              onClick={handleSubmit}
            >
              작성
            </button>
          </main>
          <footer>
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default CreateNoticeModal;