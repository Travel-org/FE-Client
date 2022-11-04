import { css } from "@emotion/react";
import { api } from "@src/app/api/api";
import TextAvatar from "@src/components/atoms/textAvatar";
import { BiPencil } from "react-icons/bi";
import { theme } from "@src/styles/theme";
import { Container } from "./styles";
import { useEffect, useRef, useState } from "react";

const MyPage = () => {
  const { data: myData } = api.useGetMyInfoQuery();
  const [updateMyInfo] = api.useUpdateMyInfoMutation();
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
            <TextAvatar
              name={myData.name}
              width={"6rem"}
              height={"6rem"}
              size={3}
            />
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
    </Container>
  );
};

export default MyPage;