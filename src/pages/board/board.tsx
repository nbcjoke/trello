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
  container,
  listAddButton,
  saveButton,
  input,
  removeButton,
  editListTitleClass,
} from "./styles.css";
import addTaskIcon from "../../assets/add.svg";
import deleteIcon from "../../assets/delete.svg";
import editIcon from "../../assets/change.svg";
import { Popup } from "../../components/popup/popup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";
import { Modal } from "../../components/modal/modal";
import { Menu } from "../../components/menu/menu";
import { Task } from "../../types/task";

export const Board = () => {
  const [board, setBoard] = useState<BoardType | undefined>();
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [editingBoardTitle, setEditingBoardTitle] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState<string | undefined>();
  const [addingTask, setAddingTask] = useState<{ [key: string]: boolean }>({});
  const [editingList, setEditingList] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [listTitle, setListTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
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
    editList,
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

  const removeTask = (
    e: MouseEvent<HTMLButtonElement>,
    listId: string,
    taskId: string
  ) => {
    e.stopPropagation();
    dispatch(deleteTask({ listId, taskId }));
  };

  const onDragEnd = (result: DropResult) => {
    dispatch(reorderBoard(result));
  };

  const startAddingTask = (id: string) => {
    setAddingTask({ [id]: true });
  };

  // const changeStateModal = (id: string) => {
  //   setOpenModal({ [id]: true });
  // };

  const startEditingList = (id: string, title: string) => {
    setEditingList({ [id]: true });
    setListTitle(title);
  };

  const changeStateMenu = () => {
    setOpenMenu(!openMenu);
  };

  const selectTask = (listId: string, taskId: string) => {
    const list = board?.lists.find((list) => list.id === listId);
    const task = list?.tasks.find((task) => task.id === taskId);
    if (!task) {
      return;
    }
    setSelectedTask({ ...task, listId: list?.id });
  };

  console.log(selectedTask);

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
          <>
            <div
              className={boardEditButton}
              onClick={() => setEditingBoardTitle(true)}
            >
              <img src={editIcon} alt="edit icon" className={icon} />
            </div>
            {openMenu ? (
              ""
            ) : (
              <button className={saveButton} onClick={changeStateMenu}>
                Open activity menu
              </button>
            )}
          </>
        )}
      </div>
      <div className={container}>
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
                                  onClick={() =>
                                    startEditingList(list.id, list.title)
                                  }
                                >
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
                            </>
                          )}
                        </div>
                        <div className={taskWrapper}>
                          {list.tasks?.map((task, index) => {
                            return (
                              <>
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      onClick={() =>
                                        selectTask(list.id, task.id)
                                      }
                                      className={taskCard}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <div>{task.description}</div>
                                      <button
                                        className={removeButton}
                                        onClick={(e) =>
                                          removeTask(e, list.id, task.id)
                                        }
                                      >
                                        <img
                                          src={deleteIcon}
                                          alt="delete icon"
                                          className={icon}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              </>
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
        {openMenu && (
          <Menu changeStateMenu={changeStateMenu} openMenu={openMenu} />
        )}
        {selectedTask && (
          <Modal
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        )}
      </div>
    </DragDropContext>
  );
};
