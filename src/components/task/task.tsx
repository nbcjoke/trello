import { FunctionComponent, MouseEvent } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";
import { Task } from "../../types/task";
import { Board } from "../../types/board";
import { List } from "../../types/list";

import deleteIcon from "../../assets/delete.svg";
import { icon, removeButton, taskCard } from "./styles.css";
interface TaskProps {
  board: Board;
  list: List;
  task: Task;
  index: number;
  setSelectedTask: (task: Task) => void;
}
export const TaskComponent: FunctionComponent<TaskProps> = ({
  board,
  list,
  task,
  index,
  setSelectedTask,
}) => {
  const dispatch = useAppDispatch();
  const { deleteTask } = boardSlice.actions;

  const removeTask = (
    e: MouseEvent<HTMLButtonElement>,
    listId: string,
    taskId: string
  ) => {
    e.stopPropagation();
    dispatch(deleteTask({ listId, taskId }));
  };

  const selectTask = (listId: string, taskId: string) => {
    const list = board?.lists.find((list) => list.id === listId);
    const task = list?.tasks.find((task) => task.id === taskId);
    if (!task) {
      return;
    }
    setSelectedTask({ ...task, listId: list?.id });
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => selectTask(list.id, task.id)}
          className={taskCard}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          data-isdragging={snapshot.isDragging}
        >
          <div>{task.description}</div>
          <button
            className={removeButton}
            onClick={(e) => removeTask(e, list.id, task.id)}
          >
            <img src={deleteIcon} alt="delete icon" className={icon} />
          </button>
        </div>
      )}
    </Draggable>
  );
};
