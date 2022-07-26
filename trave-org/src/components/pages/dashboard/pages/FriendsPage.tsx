import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { api, IPageRequest, IUserResponse } from "@src/app/api/api";
import { theme } from "@src/styles/theme";
import { useEffect, useRef, useState } from "react";
import friendApi from "@src/app/api/friendApi";
import travelApi from "@src/app/api/travelApi";
import TextAvatar from "@src/components/atoms/textAvatar";
import { BiMailSend, BiSearchAlt2 } from "react-icons/bi";
import FriendsDetail from "@src/components/organisms/friendsDetail";

const BtnWarpper = styled.div`
  display: grid;
  width: 20vw;
  grid-template-columns: repeat(3, 1fr);
`;

const Button = styled.button<{ state: boolean }>`
  padding: 1rem;
  border: none;
  border-radius: 10px 10px 0px 0px;
  background: ${({ state }) => (state ? "white" : "none")};
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const UserContainer = styled.div`
  height: 4rem;
  display: flex;
  padding: 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1px solid black; */
`;

const FriendsListContainer = styled.div`
  width: 20vw;
  height: 100%;
  background: white;
  box-sizing: border-box;
  padding: 1rem;
`;

const FriendsDetailContainer = styled.div``;

const Cancel = ({ onClick }: { onClick: () => void }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M7.52808 0.916626L4.50016 4.17746L1.47225 0.916626L0.708496 1.73913L3.73641 4.99996L0.708496 8.26079L1.47225 9.08329L4.50016 5.82246L7.52808 9.08329L8.29183 8.26079L5.26391 4.99996L8.29183 1.73913L7.52808 0.916626Z"
      fill="#e64343"
    />
  </svg>
);

const Check = ({ onClick }: { onClick: () => void }) => (
  <svg
    width="9"
    height="8"
    viewBox="0 0 9 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M3.15928 7.29991L0.478027 4.41241L1.24394 3.58757L3.16009 5.64878L3.15928 5.64966L7.75532 0.700073L8.52124 1.52491L3.92519 6.47507L3.15982 7.29932L3.15928 7.29991Z"
      fill="#57ed5c"
    />
  </svg>
);

function FriendsPage() {
  // const { data: travelsData } = travelApi.useGetTravelsQuery();

  // const { data: friends } = friendApi.useGetFriendsQuery();

  const {
    data: friendsData,
    isSuccess,
    isLoading,
  } = friendApi.useGetFriendsQuery();

  const [friends, setFriends] = useState<IUserResponse[]>([]);

  const [searchField, setSearchField] = useState<string>("");

  // useEffect(()=>{
  //  setFriends(friendsData);
  // },[isSuccess])

  useEffect(() => {
    setFriends(
      friendsData?.content.filter((f) =>
        f.userName.replace(/ /g, "").includes(searchField.replace(/ /g, ""))
      )
    );
  }, [searchField]);

  const { data: givenRequestData } = friendApi.useGetGivenRequestsQuery();
  const { data: givingRequestData } = friendApi.useGetGivingRequestsQuery();
  const [friend, setFriend] = useState<string>();
  const [sendEmail] = friendApi.useSendEmailMutation();
  const [deleteFriends] = friendApi.useDeleteFriendsMutation();
  const [acceptRequest] = friendApi.useAcceptFriendsRequestMutation();
  const [rejectRequest] = friendApi.useRejectFriendsRequestMutation();
  const [cancelRequest] = friendApi.useCancelFriendsRequestMutation();
  const addEmailRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"list" | "given" | "giving">("list");
  const handleAddFriends = () => {
    if (
      addEmailRef.current?.value === "" ||
      addEmailRef.current?.value === undefined
    )
      return;
    sendEmail(addEmailRef.current?.value);
  };
  if (isLoading) return <p>loading...</p>;
  if (isSuccess)
    return (
      <div
        css={css`
          height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
          box-shadow: 0px 0px 3px ${theme.colors.shadow};
        `}
      >
        <BtnWarpper>
          <Button state={type === "list"} onClick={() => setType("list")}>
            친구목록
          </Button>
          <Button state={type === "giving"} onClick={() => setType("giving")}>
            보낸요청
          </Button>
          <Button state={type === "given"} onClick={() => setType("given")}>
            받은요청
          </Button>
        </BtnWarpper>
        <Container>
          <FriendsListContainer>
            {type === "list" && (
              <>
                <div
                  css={css`
                    display: flex;
                    button {
                      white-space: nowrap;
                    }
                  `}
                >
                  <div
                    css={css`
                      width: 100%;
                      position: relative;
                      align-items: center;
                    `}
                  >
                    <BiSearchAlt2
                      css={css`
                        position: absolute;
                        top: 0.2rem;
                        left: 0.2rem;
                      `}
                    />
                    <input
                      placeholder="친구를 검색해보세요!"
                      css={css`
                        width: 100%;
                        padding: 0px 0px 0px 1.2rem;
                      `}
                      onChange={(e) => {
                        setSearchField(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {searchField === ""
                  ? friendsData.content?.map(
                      ({ profilePath, userId, userName, email }) => (
                        <UserContainer key={1}>
                          <div
                            css={css`
                              display: flex;
                              align-items: center;
                              column-gap: 1rem;
                              img {
                                width: 2rem;
                                height: 2rem;
                                border-radius: 100vw;
                              }
                              cursor: pointer;
                              :hover {
                                opacity: 50%;
                              }
                            `}
                            onClick={() => setFriend(userId)}
                          >
                            {profilePath === null ? (
                              <TextAvatar
                                name={userName}
                                width="3rem"
                                height="3rem"
                                size={1.6}
                              />
                            ) : (
                              <img
                                css={css`
                                  width: 3rem;
                                  height: 3rem;
                                `}
                                src={profilePath}
                              />
                            )}
                            <div
                              css={css`
                                * {
                                  margin: 0px;
                                }
                                p:nth-child(2) {
                                  font-size: 2px;
                                  color: grey;
                                }
                              `}
                            >
                              <p>{userName}</p>
                              <p>{email}</p>
                            </div>
                          </div>
                          <p
                            css={css`
                              border-radius: 5px;
                              padding: 0.1rem;
                              border: 0.1rem solid grey;
                              cursor: pointer;
                              :hover {
                                opacity: 50%;
                              }
                            `}
                            onClick={() => deleteFriends(userId)}
                          >
                            삭제
                          </p>
                        </UserContainer>
                      )
                    )
                  : friends?.map(({ profilePath, userId, userName, email }) => (
                      <UserContainer key={1}>
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                            column-gap: 1rem;
                            img {
                              width: 2rem;
                              height: 2rem;
                              border-radius: 100vw;
                            }
                          `}
                        >
                          {profilePath === null ? (
                            <TextAvatar
                              name={userName}
                              width="3rem"
                              height="3rem"
                              size={1.6}
                            />
                          ) : (
                            <img
                              css={css`
                                width: 3rem;
                                height: 3rem;
                              `}
                              src={profilePath}
                            />
                          )}
                          <div
                            css={css`
                              * {
                                margin: 0px;
                              }
                              p:nth-child(2) {
                                font-size: 2px;
                                color: grey;
                              }
                            `}
                          >
                            <p>{userName}</p>
                            <p>{email}</p>
                          </div>
                        </div>
                        <p
                          css={css`
                            border-radius: 5px;
                            padding: 0.1rem;
                            border: 0.1rem solid grey;
                            cursor: pointer;
                            :hover {
                              opacity: 50%;
                            }
                          `}
                          onClick={() => deleteFriends(userId)}
                        >
                          삭제
                        </p>
                      </UserContainer>
                    ))}
              </>
            )}

            {type === "given" && (
              <>
                {givenRequestData !== undefined &&
                  givenRequestData?.content.map(
                    ({ profilePath, userId, userName, email }) => (
                      <UserContainer
                        key={userId}
                        css={css`
                          height: 6rem;
                          flex-direction: column;
                        `}
                      >
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                            column-gap: 1rem;
                            img {
                              width: 2rem;
                              height: 2rem;
                              border-radius: 100vw;
                            }
                          `}
                        >
                          {profilePath === null ? (
                            <TextAvatar
                              name={userName}
                              width="3rem"
                              height="3rem"
                              size={1.6}
                            />
                          ) : (
                            <img
                              css={css`
                                width: 3rem;
                                height: 3rem;
                              `}
                              src={profilePath}
                            />
                          )}
                          <div
                            css={css`
                              * {
                                margin: 0px;
                              }
                              p:nth-child(2) {
                                font-size: 2px;
                                color: grey;
                              }
                            `}
                          >
                            <p>{userName}</p>
                            <p>{email}</p>
                          </div>
                        </div>
                        <div
                          css={css`
                            display: flex;
                            width: 100%;
                            justify-content: space-between;
                            svg {
                              width: 1rem;
                              height: 1rem;
                              cursor: pointer;
                              :hover {
                                opacity: 50%;
                              }
                            }
                          `}
                        >
                          <Cancel onClick={() => rejectRequest(userId)} />
                          <Check onClick={() => acceptRequest(userId)} />
                        </div>
                      </UserContainer>
                    )
                  )}
              </>
            )}
            {type === "giving" && (
              <>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    column-gap: 1rem;
                  `}
                >
                  <input
                    css={css`
                      width: 100%;
                    `}
                    ref={addEmailRef}
                    placeholder="이메일을 입력해주세요"
                  />
                  <BiMailSend
                    css={css`
                      width: 1.2rem;
                      height: 1.2rem;
                      cursor: pointer;
                      :hover {
                        opacity: 50%;
                      }
                    `}
                    onClick={handleAddFriends}
                  />
                </div>
                {givingRequestData !== undefined &&
                  givingRequestData?.content.map(
                    ({ profilePath, userId, userName, email }) => (
                      <UserContainer key={1}>
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                            column-gap: 1rem;
                            img {
                              width: 2rem;
                              height: 2rem;
                              border-radius: 100vw;
                            }
                          `}
                        >
                          {profilePath === null ? (
                            <TextAvatar
                              name={userName}
                              width="3rem"
                              height="3rem"
                              size={1.6}
                            />
                          ) : (
                            <img
                              css={css`
                                width: 3rem;
                                height: 3rem;
                              `}
                              src={profilePath}
                            />
                          )}
                          <div
                            css={css`
                              * {
                                margin: 0px;
                              }
                              p:nth-child(2) {
                                font-size: smaller;
                                color: grey;
                              }
                            `}
                          >
                            <p>{userName}</p>
                            <p>{email}</p>
                          </div>
                        </div>
                        <p
                          css={css`
                            border-radius: 5px;
                            padding: 0.1rem;
                            border: 0.1rem solid grey;
                            cursor: pointer;
                            :hover {
                              opacity: 50%;
                            }
                          `}
                          onClick={() => cancelRequest(userId)}
                        >
                          삭제
                        </p>
                      </UserContainer>
                    )
                  )}
              </>
            )}
          </FriendsListContainer>
          <FriendsDetail targetId={friend!} />
        </Container>
      </div>
    );
  else return <p>error</p>;
}

export default FriendsPage;