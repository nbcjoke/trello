import { FunctionComponent } from "react";
import { Droppable } from "react-beautiful-dnd";

import { List } from "../../types/list";
import { TaskComponent } from "../task/task";

interface ListProps {
  list: List;
  ref: (element: HTMLElement | null) => void;
  children: any;
}
export const ListComponent: FunctionComponent<ListProps> = ({ list }) => {
  return (
    <div>
      <h2>{list.title}</h2>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <div>
            {list.tasks.map((task, index) => (
              <TaskComponent
                {...provided.droppableProps}
                ref={provided.innerRef}
                index={index}
                task={task}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
