import styled from "@emotion/styled";
import postApi from "@src/app/api/postApi";

const FeedsContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const FeedContainer = styled.div`
  width: 50%;
  padding: 10px;
  border: 1px solid #037bfc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const UserProfileRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  padding: 5px 0px 5px 5px;
  cursor: pointer;
`;

const UserProfileImage = styled.div<{img:string}>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-right: 10px;
  background-image: url(${({img})=>img});
  background-position: center;
  background-size: cover;
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
`;

const PostImage = styled.div<{img:string}>`
  width: 100%;
  background-image: url(${({img})=>img});
  background-position: center;
  background-size: cover;
  margin: 3px;
`

function FeedPage() {
  const { data: postsData } = postApi.useGetPostsOfFriendsQuery();
  return (
    <FeedsContainer>
      {postsData?.content !== undefined && 
      postsData?.content.map(({postId, scheduleId, userInfo, title, text, comments, photoInfos}) => (
        <FeedContainer>
          <UserProfileRow>
            <UserProfileImage img={userInfo.profilePath}/>
            <UserInfo>
              {userInfo.userName}
            </UserInfo>
          </UserProfileRow>
          <PostImage img={photoInfos[0].name} />
          <p>{text}</p>
        </FeedContainer>
      ))}
    </FeedsContainer>
    );
  }
  
  export default FeedPage;