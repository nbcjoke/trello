import { FunctionComponent, MouseEvent } from "react";
import { Link } from "react-router-dom";

import { boardItem, iconWrapper, iconButton, icon } from "./styles.css";
import deleteIcon from "../../assets/delete.svg";
import { Board } from "../../types/board";

interface BoardCardProps {
  board: Board;
  removeBoard: (e: MouseEvent<HTMLButtonElement>, id: string) => void;
}

export const BoardCard: FunctionComponent<BoardCardProps> = ({
  board,
  removeBoard,
}) => {
  return (
    <Link to={`board/${board.id}`}>
      <div className={boardItem}>
        <p>{board.title}</p>
        <div className={iconWrapper}>
          <button
            className={iconButton}
            onClick={(e) => removeBoard(e, board.id)}
          >
            <img className={icon} src={deleteIcon} alt="delete" />
          </button>
        </div>
      </div>
    </Link>
  );
};
