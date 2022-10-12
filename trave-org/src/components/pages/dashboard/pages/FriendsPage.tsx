import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { api } from "@src/app/api";
import { theme } from "@src/styles/theme";
import { useRef, useState } from "react";

const BtnWarpper = styled.div`
  width: 100%;
  background: #ababab;
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
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid black;
  :hover {
    p:nth-child(3) {
      visibility: visible;
    }
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 100vw;
  }
  p:nth-child(3) {
    visibility: hidden;
    img {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      :hover {
        opacity: 50%;
      }
    }
  }
`;

const FriendsListContainer = styled.div`
  width: 20vw;
  height: 100%;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
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
  const { data: travelsData } = api.useGetTravelsQuery();
  const { data: friendsData } = api.useGetFriendsQuery();
  const { data: givenRequestData } = api.useGetGivenRequestsQuery();
  const { data: givingRequestData } = api.useGetGivingRequestsQuery();
  const [deleteFriends] = api.useDeleteFriendsMutation();
  const [acceptRequest] = api.useAcceptFriendsRequestMutation();
  const [rejectRequest] = api.useRejectFriendsRequestMutation();
  const addEmailRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"list" | "given" | "giving">("list");
  const handleAddFriends = () => {};

  return (
    <div
      css={css`
        height: calc(100vh - 80px);
        display: flex;
        flex-direction: column;
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
                <input
                  css={css`
                    width: 100%;
                  `}
                />
                <button>검색</button>
              </div>
              {friendsData !== undefined &&
                friendsData.map(({ profilePath, userId, userName }) => (
                  <UserContainer key={1}>
                    <img src={profilePath} />
                    <p>{userName}</p>
                    <p onClick={() => deleteFriends(userId)}>
                      <img src="/cancel.svg" />
                    </p>
                  </UserContainer>
                ))}
            </>
          )}

          {type === "given" && (
            <>
              {givenRequestData !== undefined &&
                givenRequestData.map(({ profilePath, userId, userName }) => (
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
                        width: 100%;
                        justify-content: space-evenly;
                      `}
                    >
                      <img src={profilePath} />
                      <p>{userName}</p>
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
                ))}
            </>
          )}
          {type === "giving" && (
            <>
              <div
                css={css`
                  display: flex;
                  button {
                    white-space: nowrap;
                  }
                `}
              >
                <input
                  css={css`
                    width: 100%;
                  `}
                  ref={addEmailRef}
                />
                <button onClick={handleAddFriends}>추가</button>
              </div>
              {givingRequestData !== undefined &&
                givingRequestData.map(({ profilePath, userId, userName }) => (
                  <UserContainer key={1}>
                    <img src={profilePath} />
                    <p>{userName}</p>
                    <p onClick={() => {}}>
                      <img src="/cancel.svg" />
                    </p>
                  </UserContainer>
                ))}
            </>
          )}
        </FriendsListContainer>
        <FriendsDetailContainer></FriendsDetailContainer>
      </Container>
    </div>
  );
}
    </div>
  );
}

export default FriendsPage;