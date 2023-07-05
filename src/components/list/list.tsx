import { FunctionComponent, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { TaskComponent } from "../task/task";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";
import { List } from "../../types/list";
import { Board } from "../../types/board";
import { Task } from "../../types/task";

import addTaskIcon from "../../assets/add.svg";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/change.svg";
import {
  listWrapper,
  titleWrapper,
  title,
  buttonsWrapper,
  taskWrapper,
  addTaskWrapper,
  addTaskButton,
  icon,
  saveButton,
  input,
  editListTitleClass,
} from "./styles.css";

interface ListProps {
  list: List;
  board: Board;
  setSelectedTask: (task: Task) => void;
}

export const ListComponent: FunctionComponent<ListProps> = ({
  list,
  board,
  setSelectedTask,
}) => {
  const [addingTask, setAddingTask] = useState<{ [key: string]: boolean }>({});
  const [editingList, setEditingList] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [listTitle, setListTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const dispatch = useAppDispatch();

  const { deleteList, addTask, editList } = boardSlice.actions;

  const removeList = (id: string) => {
    dispatch(deleteList(id));
  };

  const editListTitle = (id: string) => {
    if (!listTitle) return;
    dispatch(editList({ id, title: listTitle }));
    setEditingList({ [id]: false });
  };

  const createTask = (id: string) => {
    if (!taskDescription) return;
    const task = {
      id: uuid(),
      description: taskDescription,
    };
    dispatch(addTask({ id, task }));
    setAddingTask({ [id]: false });
    setTaskDescription("");
  };

  const startAddingTask = (id: string) => {
    setAddingTask({ [id]: true });
  };

  const startEditingList = (id: string, title: string) => {
    setEditingList({ [id]: true });
    setListTitle(title);
  };

  return (
    <Droppable droppableId={list.id}>
      {(provided) => (
        <>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={listWrapper}
          >
            <div key={list.id}>
              <div className={titleWrapper}>
                {editingList[list.id] ? (
                  <div className={editListTitleClass}>
                    <input
                      className={input}
                      type="text"
                      name="boardTitle"
                      placeholder="Edit list title"
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                    />
                    <button
                      className={saveButton}
                      onClick={() => editListTitle(list.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className={title}>{list.title}</h2>
                    <div className={buttonsWrapper}>
                      <div
                        onClick={() => startEditingList(list.id, list.title)}
                      >
                        <img className={icon} src={editIcon} alt="edit icon" />
                      </div>
                      <div onClick={() => removeList(list.id)}>
                        <img
                          className={icon}
                          src={deleteIcon}
                          alt="delete icon"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className={taskWrapper}>
                {list.tasks?.map((task, index) => {
                  return (
                    <TaskComponent
                      key={task.id}
                      board={board}
                      list={list}
                      task={task}
                      index={index}
                      setSelectedTask={setSelectedTask}
                    />
                  );
                })}
                <div className={addTaskWrapper}>
                  {addingTask[list.id] ? (
                    <>
                      <input
                        className={input}
                        type="text"
                        name="boardTitle"
                        placeholder="Add task"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                      />
                      <button
                        className={saveButton}
                        onClick={() => createTask(list.id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      className={addTaskButton}
                      onClick={() => startAddingTask(list.id)}
                    >
                      <img className={icon} src={addTaskIcon} alt="add task" />{" "}
                      Add a card
                    </button>
                  )}
                </div>
              </div>
            </div>
            {provided.placeholder}
          </div>
        </>
      )}
    </Droppable>
  );
};
