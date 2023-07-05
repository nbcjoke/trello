import { useState, FunctionComponent } from "react";

import {
  modalContainer,
  input,
  button,
  centred,
  form,
  modal,
  closeButton,
  modalHeader,
} from "./styles.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { boardSlice } from "../../store/reducers/boardReducer";
import { Task } from "../../types/task";

interface ModalProps {
  selectedTask: Task;
  setSelectedTask: (arg: any | undefined) => void;
}

export const Modal: FunctionComponent<ModalProps> = ({
  setSelectedTask,
  selectedTask,
}) => {
  const [description, setDescription] = useState<string | undefined>(
    selectedTask.description
  );

  const dispatch = useAppDispatch();

  const { editTask } = boardSlice.actions;

  const editTaskDescription = () => {
    dispatch(
      editTask({
        taskId: selectedTask.id,
        listId: selectedTask.listId,
        description,
      })
    );
    setSelectedTask();
  };

  return (
    <div className={modalContainer}>
      <div className={centred}>
        <div className={modal}>
          <div className={modalHeader}>
            <button className={closeButton} onClick={() => setSelectedTask()}>
              Close
            </button>
          </div>
          <div className={form}>
            <input
              className={input}
              type="text"
              name="taskDescription"
              placeholder="Change task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={button} onClick={editTaskDescription}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
