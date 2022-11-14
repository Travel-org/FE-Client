import { css } from "@emotion/react";
import styled from "@emotion/styled";
import friendApi from "@src/app/api/friendApi";
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

const PostImage = styled.img`
  width: 100%;
  height: 20rem;
  background-position: center;
  background-size: cover;
`;

const PlcaeLink = styled.a`
  text-decoration: none;
  color: gray;
  text-weight: 600;
`;

interface Props {
  targetId: string;
}

const FriendsDetail = ({ targetId }: Props) => {
  const { data: friendsProfile } = friendApi.useShowFriendsProfileQuery(
    targetId!
  );
  return (
    <div
      css={css`
        display: flex;
        padding: 1rem;
      `}
    >
      {friendsProfile !== undefined && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              box-shadow: 0px 0px 3px ${theme.colors.shadow};
              border-radius: 10px;
              padding: 1rem;
              gap: 1rem;
            `}
          >
            {friendsProfile.profilePath === null ? (
              <TextAvatar
                name={friendsProfile.name}
                width="6rem"
                height="6rem"
                size={4}
              />
            ) : (
              <img
                css={css`
                  width: 3rem;
                  height: 3rem;
                `}
                src={friendsProfile.profilePath}
              />
            )}
            <div>
              <p>{friendsProfile.name}</p>
              <p>{friendsProfile.email}</p>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              width: 60vw;
              gap: 1rem;
              padding: 1rem;
              overflow: auto;
            `}
          >
            {friendsProfile.posts.map(
              ({ postId, placeName, placeUrl, text, userInfo, photoInfos }) => (
                <div key={postId}>
                  <FeedContainer>
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
                      <p css={css`width: 80%;word-wrap: break-word;`}>{text}</p>
                      <div css={css`width: 20%;display:flex;justify-content:end;`}>
                        <p>❤️</p>
                        <p>👏</p>
                      </div>
                    </div>
                    <PlcaeLink href={placeUrl}>#{placeName}</PlcaeLink>
                  </FeedContainer>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FriendsDetail;