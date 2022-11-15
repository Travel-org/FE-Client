import styled from "@emotion/styled";
import eventApi from "@src/app/api/eventApi"
import { useParams } from "react-router-dom";

const EventContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px 10px;
`;
const EventHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    border-bottom: 1px solid gray;
    padding-bottom: 5px;
`;

const EventTitle = styled.p`
    width: 80%;
    font-size: 30px;
    font-weight: 600;
`;

const EventHeaderColumn = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items:end;
`

const EventAuthor = styled.div`
    color: black;
`

const EventCreatedAt = styled.div`
    color: gray;
`;

const EventPhoto = styled.div<{ img: string }>`
  width: 100%;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-size: cover;
`;

const EventContent = styled.p`
    width: 100%;
`;

const EventDetail = () => {

    const { eventId } = useParams<"eventId">();

    const {data: eventData} = eventApi.useGetEventQuery(eventId as string);
    return (
        <EventContainer>
            <EventHeader>
                <EventTitle>
                    {eventData?.title}
                </EventTitle>
                <EventHeaderColumn>
                    <EventAuthor>
                        {eventData?.authorInfo.userName}
                    </EventAuthor>
                    <EventCreatedAt>
                        {eventData?.createdAt.substring(0, 10)}
                    </EventCreatedAt>
                </EventHeaderColumn>
            </EventHeader>
            {eventData !== undefined &&
            eventData.photoInfos.map(
                (photo) => (
                    <EventPhoto img={photo.name}></EventPhoto>
                )
            )}
            <EventContent>
                {eventData?.content}
            </EventContent>
        </EventContainer>
    )
}

export default EventDetail;