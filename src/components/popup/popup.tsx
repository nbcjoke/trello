import { FunctionComponent, useState } from "react";
import { v4 as uuid } from "uuid";

import { popupContainer, input, buttonContainer, button } from "./styles.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";

interface PopupProps {
  changeStatePopup: () => void;
}

export const Popup: FunctionComponent<PopupProps> = ({ changeStatePopup }) => {
  const [listTitle, setListTitle] = useState<string>("");

  const dispatch = useAppDispatch();
  const { addList } = boardSlice.actions;

  const createList = () => {
    if (!listTitle) return;
    const list = {
      id: uuid(),
      title: listTitle,
      tasks: [],
    };

    dispatch(addList(list));
    changeStatePopup();
  };

  return (
    <div className={popupContainer}>
      <input
        className={input}
        name="listTitle"
        placeholder="Enter list title"
        type="text"
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />
      <div className={buttonContainer}>
        <button className={button} onClick={createList}>
          Add list
        </button>
        <button className={button} onClick={changeStatePopup}>
          X
        </button>
      </div>
    </div>
  );
};
