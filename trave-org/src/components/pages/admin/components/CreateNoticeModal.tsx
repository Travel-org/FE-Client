import { css } from "@emotion/react";

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const files = e.target[2].files;

    formData.append('title', e.target[0].value);
    formData.append('content', e.target[1].value);
    formData.append('photos', files);
}

const CreateNoticeModal = (props) => {
    const { open, close } = props;
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal' } css={css`
            display: flex;
        `} >
          {open ? (
            <section css={css`
                width: 400px;
                height: 400px;
                background-color: white;
                border: solid 1px black;
                margin-left: 30%;
            `}>
              <header>
                <button className="close" onClick={close} css={css`
                    display: flex;
                    margin-left: auto;
                `}>
                  &times;
                </button>
              </header>
              <main>
                  <form css={css`
                        display: flex;
                        margin-right: auto;
                        flex-direction: column;
                    `} onSubmit={handleSubmit}>
                      <textarea placeholder="제목을 입력하세요" cols={40} rows={1} css={css`
                        width: 100%;
                        overflow: auto;
                        resize: none;
                      `}></textarea>
                      <textarea placeholder="내용을 입력하세요" cols={40} rows={5} css={css`
                        margin-top: 10px;
                        width: 100%;    
                        overflow: auto;
                        resize: none;
                      `}></textarea>
                      <input type="file" multiple accept="image/*"></input>
                      <button css={css`
                        margin-top: 41%;
                        width: 100px;
                        height: 30px;
                      `}>작성</button>
                  </form>
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
}

export default CreateNoticeModal;