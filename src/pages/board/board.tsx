import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { cloneDeep } from "lodash";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Board as BoardType } from "../../types/board";
import { ListComponent } from "../../components/list/list";

import {
  listContainer,
  listWrapper,
  title,
  taskCard,
  taskWrapper,
} from "./styles.css";

export const Board = () => {
  const { id } = useParams();
  const [board, setBoard] = useState<BoardType | undefined>();
  const { boards } = useAppSelector((state) => state.board);

  useEffect(() => {
    const result = boards.find((board) => board.id === id);
    if (!result) {
      return;
    }
    setBoard(cloneDeep(result));
  }, [boards]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const originalList = board?.lists?.find(
        ({ id }) => id === source.droppableId
      );
      if (!originalList) return;
      const task = originalList.tasks.splice(source.index, 1);
      console.log(task);
      originalList.tasks.splice(destination.index, 0, task[0]);
    } else {
      const originalList = board?.lists?.find(
        ({ id }) => id === source.droppableId
      );
      const targetList = board?.lists?.find(
        ({ id }) => id === destination.droppableId
      );

      if (!originalList || !targetList) return;

      const task = originalList.tasks.splice(source.index, 1);
      targetList.tasks.splice(destination.index, 0, task[0]);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                      <h2 className={title}>{list.title}</h2>

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
                                  {task.description}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    </div>
                    {provided.placeholder}
                  </div>
                </>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};
