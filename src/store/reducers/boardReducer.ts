import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Board } from "../../types/board";
import { List } from "../../types/list";
import { DropResult } from "react-beautiful-dnd";

const boards = [
  {
    id: "10",
    title: "first",
    lists: [
      {
        id: "11",
        title: "first list",
        tasks: [
          { id: "1", description: "11111" },
          { id: "2", description: "22222" },
          { id: "3", description: "33333" },
        ],
      },
      {
        id: "12",
        title: "second list",
        tasks: [
          { id: "4", description: "44444" },
          { id: "5", description: "55555" },
          { id: "6", description: "66666" },
        ],
      },
    ],
  },
  //   {
  //     id: "2",
  //     title: "second",
  //     lists: [
  //       {
  //         id: "1",
  //         title: "first list",
  //         tasks: [{ id: "1", description: "first task" }],
  //       },
  //       {
  //         id: "2",
  //         title: "second list",
  //         tasks: [{ id: "2", description: "second task" }],
  //       },
  //     ],
  //   },
];

interface State {
  boards: Board[];
  errors: string;
  selectedBoardId?: string;
}

const initialState: State = {
  boards: boards,
  selectedBoardId: "",
  errors: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setSelectedBoardId(state, { payload }: PayloadAction<string>) {
      state.selectedBoardId = payload;
    },
    reorderBoard(state, { payload }: PayloadAction<DropResult>) {
      const { source, destination } = payload;
      if (!destination) return;
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );

      if (source.droppableId === destination.droppableId) {
        const originalList = board?.lists?.find(
          ({ id }) => id === source.droppableId
        );
        if (!originalList) return;
        const task = originalList.tasks.splice(source.index, 1);
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
    },
    addBoard(state, { payload }: PayloadAction<Board>) {
      console.log(payload);
      state.boards.push(payload);
    },
    deleteBoard(state, { payload }: PayloadAction<string>) {
      state.boards.splice(
        state.boards.findIndex((item) => item.id === payload),
        1
      );
    },
    editBoard(state, { payload }) {
      const board = state.boards.find((board) => board.id === payload.id);
      if (!board) return;
      board.title = payload.boardTitle;
    },
    addList(state, { payload }: PayloadAction<List>) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      if (!board) return;
      board.lists.push(payload);
    },
    deleteList(state, { payload }: PayloadAction<string>) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      board?.lists.splice(
        board.lists.findIndex((list) => list.id === payload),
        1
      );
    },
    editList(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      if (!board) return;
      const list = board.lists.find((list) => list.id === payload.id);
      if (!list) return;
      list.title = payload.title;
    },
    addTask(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      const list = board?.lists.find((list) => list.id === payload.id);
      list?.tasks.push(payload.task);
    },

    deleteTask(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      const list = board?.lists.find((list) => list.id === payload.listId);
      list?.tasks.splice(
        list.tasks.findIndex((task) => task.id === payload.taskId),
        1
      );
    },
    editTask(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      if (!board) return;
      const list = board.lists.find((list) => list.id === payload.listId);
      if (!list) return;
      const task = list.tasks.find((task) => task.id === payload.taskId);
      if (!task) return;
      task.description = payload.description;
    },
  },
});

export default boardSlice.reducer;
