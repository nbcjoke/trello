import { FunctionComponent } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Task } from "../../types/task";

interface TaskProps {
  task: Task;
  index: number;
  ref: (element: HTMLElement | null) => void;
}
export const TaskComponent: FunctionComponent<TaskProps> = ({
  task,
  index,
}) => {
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided: any, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // data-isDragging={snapshot.isDragging}
        >
          <p>{task.description}</p>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};
