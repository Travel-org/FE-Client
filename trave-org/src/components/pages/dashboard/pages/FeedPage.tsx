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
  width: 30vw;
  border: none;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  padding: 1rem 0px;
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


const PostImage = styled.div<{ img: string }>`
  width: 100%;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
  margin: 3px;
`;

function FeedPage() {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: postsData,
    isLoading,
    isSuccess,
  } = postApi.useGetPostsOfFriendsQuery({ pageSize, pageNumber });

  useEffect(() => {
    console.log(postsData?.content);
  }, [postsData]);

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
  else if (isSuccess)
    return (
      <FeedsContainer>
        <InfiniteScroll
          dataLength={pageSize * pageNumber}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {postsData !== undefined &&
            postsData.content.map(
              ({
                postId,
                scheduleId,
                userInfo,
                title,
                text,
                comments,
                photoInfos,
              }) => (
                <FeedContainer>
                  <UserProfileRow>
                    <UserProfileImage img={userInfo.profilePath} />
                    <UserInfo>{userInfo.userName}</UserInfo>
                  </UserProfileRow>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    scrollbar={{ draggable: true }}
                    navigation
                    pagination={{ clickable: true }}
                  >
                    {photoInfos.map(({ name }) => (
                      <SwiperSlide>
                        <PostImage img={name} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <p>{text}</p>
                </FeedContainer>
              )
            )}
        </InfiniteScroll>
      </FeedsContainer>
    );
  else return <p>에러</p>;
}

export default FeedPage;