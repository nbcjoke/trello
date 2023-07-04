import { useState, MouseEvent } from "react";
import { v4 as uuid } from "uuid";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { boardSlice } from "../../store/reducers/boardReducer";

import {
  title,
  description,
  createBoardForm,
  createInput,
  createButton,
  boardContainer,
  boardTitle,
} from "./styles.css";
import { BoardCard } from "../../components/boardCard/boardCard";

export const Home = () => {
  const [name, setName] = useState<string>("");
  const { boards } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  const { addBoard, deleteBoard } = boardSlice.actions;

  const createBoard = (name: string) => {
    if (!name) return;
    const board = {
      id: uuid(),
      title: name,
      lists: [],
    };
    dispatch(addBoard(board));
    setName("");
  };

  const removeBoard = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteBoard(id));
  };

  return (
    <div>
      <h1 className={title}>Welcome to Trello clone</h1>
      <div>
        <p className={description}>Create your board</p>
        <div className={createBoardForm}>
          <input
            className={createInput}
            name="name"
            value={name}
            placeholder="Enter board name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <button className={createButton} onClick={() => createBoard(name)}>
            Create
          </button>
        </div>
      </div>
      <h2 className={boardTitle}>Boards</h2>
      {boards.length ? (
        <div className={boardContainer}>
          {boards.map((board) => {
            return (
              <BoardCard
                board={board}
                removeBoard={removeBoard}
                key={board.id}
              />
            );
          })}
        </div>
      ) : (
        <h2 className={boardTitle}>You don't have any boards yet</h2>
      )}
    </div>
  );
};
