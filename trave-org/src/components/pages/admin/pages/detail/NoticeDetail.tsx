import styled from "@emotion/styled";
import noticeApi from "@src/app/api/noticeApi";
import { useParams } from "react-router-dom";

const NoticeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;
const NoticeHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 1px solid gray;
  padding-bottom: 5px;
`;

const NoticeTitle = styled.p`
  width: 80%;
  font-size: 30px;
  font-weight: 600;
`;

const NoticeHeaderColumn = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const NoticeAuthor = styled.div`
  color: black;
`;

const NoticeCreatedAt = styled.div`
  color: gray;
`;

const NoticePhoto = styled.div<{ img: string }>`
  width: 100%;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const NoticeContent = styled.p`
  width: 100%;
`;

const NoticeDetail = () => {
  const { noticeId } = useParams<"noticeId">();

  const { data: noticeData } = noticeApi.useGetNoticeQuery(noticeId as string);

  console.log(noticeData);
  return (
    <NoticeContainer>
      <NoticeHeader>
        <NoticeTitle>{noticeData?.title}</NoticeTitle>
        <NoticeHeaderColumn>
          <NoticeAuthor>{noticeData?.authorInfo.userName}</NoticeAuthor>
          <NoticeCreatedAt>
            {noticeData?.createdAt.substring(0, 10)}
          </NoticeCreatedAt>
        </NoticeHeaderColumn>
      </NoticeHeader>
      {noticeData !== undefined &&
        noticeData.photoInfos.map((photo, idx) => (
          <img
            key={idx}
            src={photo.name}
            style={{ maxWidth: "800px", width: "100%" }}
          ></img>
        ))}
      <NoticeContent>{noticeData?.content}</NoticeContent>
    </NoticeContainer>
  );
};

export default NoticeDetail;