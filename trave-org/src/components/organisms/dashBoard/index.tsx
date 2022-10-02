import { DashBaordStyle, ScheduleContainer, AddButton } from "./styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; // eslint-disable-line
import ScheduleBoard from "@atoms/scheduleBoard";
import { useState } from "react";

interface Props {
  setInnerDashBoardOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashBoard = ({ setInnerDashBoardOnOff }: Props) => {
  const [form, setForm] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  function handleOnDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const currentList = [...form];
    const draggingItemIndex = result.source.index;
    const dropItemIndex = result.destination.index;
    const removeForm = currentList.splice(draggingItemIndex, 1);
    currentList.splice(dropItemIndex, 0, removeForm[0]);
    setForm(currentList);
  }

  return (
    <DashBaordStyle>
      <h2>어디론가 떠나는 여행</h2>
      <h1>여행 계획하기</h1>
      <ScheduleContainer>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}>
                {form.map((item, index) => (
                  <Draggable index={index} draggableId={`${index}`}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ScheduleBoard content={item + ""} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScheduleContainer>
      <div>
        <AddButton onClick={() => setInnerDashBoardOnOff((v) => !v)}>
          + 일정 추가하기
        </AddButton>
      </div>
      <p>이동거리 : 82km</p>
      <p>소요시간 : 4시간 27분</p>
    </DashBaordStyle>
  );
};
export default DashBoard;