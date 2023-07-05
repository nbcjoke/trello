import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { cloneDeep } from "lodash";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Board as BoardType } from "../../types/board";
import { ListComponent } from "../../components/list/list";

import {
  listContainer,
  boardTitleContainer,
  boardEditButton,
  icon,
  container,
  listAddButton,
  saveButton,
  input,
} from "./styles.css";
import addTaskIcon from "../../assets/add.svg";
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
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const { id } = useParams();
  const { boards } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const { editBoard, setSelectedBoardId, reorderBoard } = boardSlice.actions;

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

  const onDragEnd = (result: DropResult) => {
    dispatch(reorderBoard(result));
  };

  const changeStateMenu = () => {
    setOpenMenu(!openMenu);
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
        <div
          className={listContainer}
          style={openMenu ? { marginRight: "370px" } : {}}
        >
          {board?.lists?.map((list) => {
            return (
              <ListComponent
                board={board}
                list={list}
                key={list.id}
                setSelectedTask={setSelectedTask}
              />
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
