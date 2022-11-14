import styled from "@emotion/styled";
import postApi from "@src/app/api/postApi";
import { Swiper, SwiperSlide } from "swiper/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IPageRequest, IPostResponse } from "@src/app/api/api";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import TextAvatar from "@src/components/atoms/textAvatar";
import { theme } from "@src/styles/theme";
import { BiExpand } from "react-icons/bi";

const FeedsContainer = styled.div`
  width: 100%;
  height: 92vh;
  overflow: auto;
  padding: 1rem;
  background-color: white;
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
`;

const FeedContainer = styled.div`
  position: relative;
  width: 40vw;
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
  cursor: pointer;
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
  height: 30rem;
  background-position: center;
  background-size: cover;
`;

function FeedPage() {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: postsData,
    isLoading,
    isSuccess,
  } = postApi.useGetPostsOfFriendsQuery({ pageSize, pageNumber });

  const fetchMoreData = () => {
    setTimeout(() => {
      setPageNumber((v) => v++);
    }, 1500);
  };
  if (isLoading)
    return (
      <div>
        <p>loading..</p>
      </div>
    );
    else if (isSuccess) {
      console.log(postsData);
    return (
      <FeedsContainer>
        <InfiniteScroll
            css={css`
            display: flex;
            flex-direction: column;
            padding: 1rem;
            row-gap: 1rem;
          `}
          dataLength={postsData.size ?? 1 * postsData.content.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<div>No more feeds!</div>}
        >
          {postsData !== undefined &&
            postsData.content.map(
              ({
                postId,
                scheduleId,
                placeName,
                placeUrl,
                userInfo,
                title,
                text,
                comments,
                photoInfos,
              }) => (
                <FeedContainer>
                  <UserProfileRow>
                  {userInfo.profilePath === null ? (
                      <TextAvatar
                        name={userInfo.userName}
                        // width="3rem"
                        // height="3rem"
                        // size={1.6}
                      />
                    ) : (
                      <img
                        css={css`
                          width: 3rem;
                          height: 3rem;
                        `}
                        src={userInfo.profilePath}
                      />
                    )}
                    <UserInfo>{userInfo.userName}</UserInfo>
                    <BiExpand
                      css={css`
                        position: absolute;
                        width: 1.2rem;
                        height: 1.2rem;
                        right: 1rem;
                        top: 1.65rem;
                      `}
                    />
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
                    {photoInfos.map(({ name }) => (
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
                  <p css={css`width: 80%;`}>{text}</p>
                  <div css={css`width: 20%;display:flex;justify-content:end;`}>
                    <p>❤️</p>
                    <p>👏</p>
                  </div>
                </div>
                <PlcaeLink href={placeUrl}>#{placeName}</PlcaeLink>
                </FeedContainer>
              )
            )}
        </InfiniteScroll>
      </FeedsContainer>
    );
  } else return <p>에러</p>;
}

export default FeedPage;