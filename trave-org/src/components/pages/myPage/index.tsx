import { css } from "@emotion/react";
import { api, IPostResponse } from "@src/app/api/api";
import TextAvatar from "@src/components/atoms/textAvatar";
import { BiPencil } from "react-icons/bi";
import { theme } from "@src/styles/theme";
import { Container } from "./styles";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Modal from "@src/components/modal";

const FeedContainer = styled.div`
  position: relative;
  background: white;
  width: 27vw;
  border: none;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const UserProfileRow = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  padding: 5px 0px 5px 5px;
`;

const UserProfileImage = styled.div<{ img: string }>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 10px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
`;

const PlcaeLink = styled.a`
  text-decoration: none;
  color: gray;
  text-weight: 600;
`;

const PostImage = styled.img`
  width: 100%;
  height: 20rem;
  background-position: center;
  background-size: cover;
`;

const Img = styled.div<{ img: string }>`
  width: 30px;
  height: 30px;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const MyPage = () => {
  const { data: myData } = api.useGetMyInfoQuery();
  const [image, setImage] = useState<{ preview: string; raw: any }>();
  const [updateMyInfo] = api.useUpdateMyInfoMutation();
  const [updateImg] = api.useUpdateMyAvatarMutation();
  const [openModal, setOpenModal] = useState(false);
  const [post, setPost] = useState<IPostResponse>();
  const [isEdit, setIsEdit] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const submitMyInfo = () => {
    updateMyInfo({
      name: nameRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
    });
  };

  const handleOpenModal = (post: any) => {
    setPost(post);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setPost(undefined);
  };
  const handleChange = (e: any) => {
    if (!isEdit) return;
    if (e.target.files.length) {
      const file = e.target.files[0];
      setImage({
        preview: URL.createObjectURL(file),
        raw: file,
      });
      e.target.value = "";
    }
  };
  const handleUploadImg = (e) => {
    e.stopPropagation();
    if (!isEdit) return;
    const formData = new FormData();
    formData.append("photo", image?.raw);
    updateImg(formData);
    setIsEdit(false);
  };
  useEffect(() => {
    if (
      nameRef.current === null ||
      emailRef.current === null ||
      phoneNumberRef.current === null
    )
      return;
    nameRef.current.value = myData?.name as string;
    emailRef.current.value = myData?.email as string;
    phoneNumberRef.current.value = myData?.phoneNumber as string;
  }, [isEdit]);

  return (
    <Container>
     {openModal && (
        <Modal onClick={handleCloseModal}>
          <FeedContainer>
            <UserProfileRow>
              {post !== undefined && post?.userInfo?.profilePath === null ? (
              <TextAvatar name={post?.userInfo?.userName} />
              ) : (
                <img
                  css={css`
                    width: 3rem;
                    height: 3rem;
                  `}
                  src={post?.userInfo?.profilePath}
                />
              )}
              <UserInfo>{post?.userInfo?.userName}</UserInfo>
            </UserProfileRow>
            <div
              css={css`
                width: 100%;
                padding: 0.1rem;
                box-sizing: border-box;
                display: flex;
                column-gap: 1rem;
                overflow: auto;
              `}
            >
              {post?.photoInfos.map(({ name }) => (
                <PostImage src={name} />
              ))}
            </div>
            <div
              css={css`
              width: 100%;
              display: flex;
              padding: 0.2rem;
            `}
          >
              <p
                css={css`
                  width: 80%;
                  word-wrap: break-word;
                `}
              >
                {post?.text}
              </p>
              <div
                css={css`
                  width: 20%;
                  display: flex;
                  justify-content: end;
                `}
              >
              <p>❤️</p>
              <p>👏</p>
            </div>
          </div>
            <PlcaeLink href={post?.placeUrl}>#{post?.placeName}</PlcaeLink>
          </FeedContainer>
        </Modal>
      )}
      <div
        css={css`
          position: relative;
        `}
      >
        {myData !== undefined && (
          <div
            css={css`
              width: 100%;
              position: relative;
              display: flex;
              justify-content: center;
              padding: 2rem;
            `}
          >
            <div
              css={css`
                box-shadow: 0px 0px 6px ${theme.colors.shadow};
                width: 30vw;
                position: relative;
                border-radius: 10px;
                padding: 2rem;
                display: flex;
                column-gap: 1rem;
                align-items: center;
                * {
                  margin: 0px;
                }
              `}
            >
              <div
                css={css`
                  cursor: ${isEdit ? "pointer" : "default"};
                  :hover {
                    opacity: ${isEdit ? "50%" : "100%"};
                  }
                `}
              >
                <input type="file" id="upload" onChange={handleChange} hidden />
                {isEdit ? (
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
                    {post !== undefined &&
                    post?.userInfo?.profilePath === null ? (
                      <TextAvatar
                        name={myData.name}
                        width={"6rem"}
                        height={"6rem"}
                        size={3}
                      />
                    ) : (
                      <img
                        css={css`
                          width: 6rem;
                          height: 6rem;
                        `}
                        src={myData.profilePath}
                      />
                    )}
                  </label>
                ) : post !== undefined &&
                  post?.userInfo?.profilePath === null ? (
                  <TextAvatar
                    name={myData.name}
                    width={"6rem"}
                    height={"6rem"}
                    size={3}
                  />
                ) : (
                  <img
                    css={css`
                      width: 6rem;
                      height: 6rem;
                    `}
                    src={myData.profilePath}
                  />
                )}

                {isEdit && <BiPencil onClick={handleUploadImg} />}
              </div>
              {!isEdit && (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem;
                  `}
                >
                  <p>이름 : {myData.name}</p>
                  <p>이메일 : {myData.email}</p>
                  <p>전화번호 : {myData.phoneNumber}</p>
                </div>
              )}
              {isEdit && (
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    row-gap: 1rem;
                    p {
                      align-items: center;
                      white-space: nowrap;
                      display: flex;
                      width: 16vw;
                      justify-content: space-between;
                    }
                    input {
                      width: 10vw;
                    }
                  `}
                >
                  <p>
                    이름 : <input ref={nameRef} />
                  </p>
                  <p>
                    전화번호 : <input ref={phoneNumberRef} />
                  </p>
                </div>
              )}
              <BiPencil
                css={css`
                  position: absolute;
                  top: 1rem;
                  right: 1rem;
                  cursor: pointer;
                  :hover {
                    opacity: 50%;
                  }
                `}
                onClick={() => setIsEdit((v) => !v)}
              />
            </div>
            {isEdit && (
              <div
                css={css`
                  position: absolute;
                  margin-top: 2rem;
                  display: flex;
                  bottom: 0px;
                  column-gap: 3rem;
                  button {
                    background: white;
                    padding: 0px 2rem;
                    border: none;
                    border-radius: 10px;
                    box-shadow: 0px 0px 3px ${theme.colors.shadow};
                    cursor: pointer;
                    :hover {
                      opacity: 50%;
                    }
                  }
                `}
              >
                <button onClick={() => setIsEdit(false)}>취소</button>
                <button onClick={submitMyInfo}>수정</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        css={css`
          width: 100%;
          position: relative;
          justify-content: center;
          padding: 2rem;
          display: flex;
          flex-wrap: wrap;
        `}
      >
        <div
          css={css`
            width: 30vw;
            position: relative;
            border-radius: 10px;
            display: flex;
            align-items: center;
            * {
              margin: 0px;
            }
          `}
        >
          {myData !== undefined &&
            myData.posts !== undefined &&
            myData.posts.map((v) => (
              <div
                css={css`
                position: relative;
                width: 5rem;
                height: 5rem;
                border: 0.1px solid #fcfcfd;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  background: white;
                  box-shadow: 0px 0px 1px ${theme.colors.shadow};
                  width: 5rem;
                  height: 5rem;
                `}
              />
              <img
                css={css`
                  position: absolute;
                  width: 5rem;
                  height: 5rem;
                `}
                src={v.photoInfos[0].name}
                onClick={() => handleOpenModal(v)}
              />
            </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default MyPage;