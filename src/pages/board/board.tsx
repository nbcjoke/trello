import { useParams } from "react-router-dom";
import { useState, useEffect, MouseEvent } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { cloneDeep } from "lodash";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { Board as BoardType } from "../../types/board";
import { ListComponent } from "../../components/list/list";

import {
  listContainer,
  boardTitleContainer,
  boardEditButton,
  listWrapper,
  titleWrapper,
  title,
  buttonsWrapper,
  taskCard,
  taskWrapper,
  addTaskWrapper,
  addTaskButton,
  icon,
  taskCardDelete,
  listAddButton,
  saveButton,
  input,
} from "./styles.css";
import addTaskIcon from "../../assets/add.svg";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/change.svg";
import { Popup } from "../../components/popup/popup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";

export const Board = () => {
  const [board, setBoard] = useState<BoardType | undefined>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [editingBoardTitle, setEditingBoardTitle] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string | undefined>();
  const [addingTasks, setAddingTasks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { id } = useParams();
  const { boards } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const {
    editBoard,
    setSelectedBoardId,
    deleteList,
    addTask,
    deleteTask,
    reorderBoard,
  } = boardSlice.actions;

  useEffect(() => {
    const result = boards.find((board) => board.id === id);
    if (!result) {
      return;
    }
    setBoard(cloneDeep(result));
    setBoardTitle(result.title);
  }, [boards]);

  useEffect(() => {
    if (!id) return;
    dispatch(setSelectedBoardId(id));
  }, []);

  const changeStatePopup = () => {
    setOpenPopup(!openPopup);
  };

  const editBoardTitle = () => {
    if (!boardTitle) return;
    dispatch(editBoard({ id, boardTitle }));
    setEditingBoardTitle(false);
  };

  const removeList = (id: string) => {
    dispatch(deleteList(id));
  };

  const createTask = (id: string) => {
    if (!taskDescription) return;
    const task = {
      id: uuid(),
      description: taskDescription,
    };
    dispatch(addTask({ id, task }));
    setAddingTasks({ ...addingTasks, [id]: false });
  };

  const removeTask = (listId: string, taskId: string) => {
    dispatch(deleteTask({ listId, taskId }));
  };

  const onDragEnd = (result: DropResult) => {
    dispatch(reorderBoard(result));
    // const { source, destination } = result;
    // if (!destination) return;
    // if (source.droppableId === destination.droppableId) {
    //   const originalList = board?.lists?.find(
    //     ({ id }) => id === source.droppableId
    //   );
    //   if (!originalList) return;
    //   const task = originalList.tasks.splice(source.index, 1);
    //   originalList.tasks.splice(destination.index, 0, task[0]);
    // } else {
    //   const originalList = board?.lists?.find(
    //     ({ id }) => id === source.droppableId
    //   );
    //   const targetList = board?.lists?.find(
    //     ({ id }) => id === destination.droppableId
    //   );
    //   if (!originalList || !targetList) return;
    //   const task = originalList.tasks.splice(source.index, 1);
    //   targetList.tasks.splice(destination.index, 0, task[0]);
    // }
  };

  const startAddingTask = (id: string) => {
    setAddingTasks({ ...addingTasks, [id]: true });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={boardTitleContainer}>
        <h2>Board: {board?.title}</h2>
        {editingBoardTitle ? (
          <>
            <input
              className={input}
              type="text"
              name="boardTitle"
              placeholder="Edit board title"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
            <button className={saveButton} onClick={editBoardTitle}>
              Save
            </button>
          </>
        ) : (
          <div
            className={boardEditButton}
            onClick={() => setEditingBoardTitle(true)}
          >
            <img src={editIcon} alt="edit icon" className={icon} />
          </div>
        )}
      </div>
      <div className={listContainer}>
        {board?.lists?.map((list) => {
          return (
            <Droppable droppableId={list.id}>
              {(provided) => (
                <>
                  {/* <ListComponent
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    list={list}
                  /> */}

                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={listWrapper}
                  >
                    <div key={list.id}>
                      <div className={titleWrapper}>
                        <h2 className={title}>{list.title}</h2>
                        <div className={buttonsWrapper}>
                          <div>
                            <img
                              className={icon}
                              src={editIcon}
                              alt="edit icon"
                            />
                          </div>
                          <div onClick={() => removeList(list.id)}>
                            <img
                              className={icon}
                              src={deleteIcon}
                              alt="delete icon"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={taskWrapper}>
                        {list.tasks?.map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className={taskCard}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <div>{task.description}</div>
                                  <div
                                    className={taskCardDelete}
                                    onClick={() => removeTask(list.id, task.id)}
                                  >
                                    <img
                                      src={deleteIcon}
                                      alt="delete icon"
                                      className={icon}
                                    />
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <div className={addTaskWrapper}>
                          {addingTasks[list.id] ? (
                            <>
                              <input
                                className={input}
                                type="text"
                                name="boardTitle"
                                placeholder="Edit board title"
                                value={taskDescription}
                                onChange={(e) =>
                                  setTaskDescription(e.target.value)
                                }
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
                              <img
                                className={icon}
                                src={addTaskIcon}
                                alt="add task"
                              />{" "}
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
        })}
        {openPopup ? (
          <Popup changeStatePopup={changeStatePopup} />
        ) : (
          <button className={listAddButton} onClick={changeStatePopup}>
            <img className={icon} src={addTaskIcon} alt="add task" /> Add list
          </button>
        )}
      </div>
    </DragDropContext>
  );
};
