import { css } from "@emotion/react";
import styled from "@emotion/styled";
import postApi from "@src/app/api/postApi";
import TextAvatar from "@src/components/atoms/textAvatar";
import { theme } from "@src/styles/theme";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiExpand, BiMessageDetail } from "react-icons/bi";

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

interface Props {
  userInfo: any;
  photoInfos: any;
  placeUrl: string;
  placeName: string;
  text: string;
  postId: number;
  comments: any;
}

const Feed = ({
  userInfo,
  photoInfos,
  placeUrl,
  placeName,
  text,
  postId,
  comments,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const [createComment] = postApi.useCreateCommentMutation();
  const handleSubmit = (event: any) => {
    if (event.key !== "Enter") return;
    createComment({
      postId,
      content: inputRef.current?.value,
    });
    event.target.value = "";
  };

  return (
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
        <p
          css={css`
            width: 80%;
            word-wrap: break-word;
          `}
        >
          {text}
        </p>
        <div
          css={css`
            width: 20%;
            display: flex;
            justify-content: end;
            gap: 1rem;
          `}
        >
          <p>❤️</p>
          <p>👏</p>
        </div>
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <PlcaeLink href={placeUrl}>#{placeName}</PlcaeLink>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.1rem;
          `}
        >
          <p>{comments.length}</p>
          <BiMessageDetail
            css={css`
              width: 1.4rem;
              height: 1.4rem;
            `}
          />
        </div>
      </div>
      <input
        ref={(el) => (inputRef.current = el as HTMLInputElement)}
        css={css`
          border: none;
          border-bottom: 1px solid grey;
        `}
        placeholder="댓글을 달아주세요"
        onKeyPress={handleSubmit}
      />
      <div>
        {comments.map(({ userInfo, content }) => (
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 2rem;
            `}
          >
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
            <p>{content}</p>
          </div>
        ))}
      </div>
    </FeedContainer>
  );
};

export default Feed;