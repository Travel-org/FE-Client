import styled from "@emotion/styled";
import postApi from "@src/app/api/postApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Feed from "@src/components/organisms/feed";

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
                <Feed
                  comments={comments}
                  postId={postId}
                  text={text}
                  userInfo={userInfo}
                  photoInfos={photoInfos}
                  placeName={placeName}
                  placeUrl={placeUrl}
                />
              )
            )}
        </InfiniteScroll>
      </FeedsContainer>
    );
  } else return <p>에러</p>;
}

export default FeedPage;