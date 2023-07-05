import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import { Board } from "../../types/board";
import { List } from "../../types/list";
import { Action } from "../../types/action";

const boards = [
  {
    id: "1",
    title: "Jira clone",
    lists: [
      {
        id: "1",
        title: "To do",
        tasks: [
          { id: "1", description: "add button" },
          { id: "2", description: "change color" },
          { id: "3", description: "change styles" },
        ],
      },
      {
        id: "2",
        title: "In progress",
        tasks: [
          { id: "1", description: "add button" },
          { id: "2", description: "change color" },
          { id: "3", description: "change styles" },
        ],
      },
      {
        id: "3",
        title: "Done",
        tasks: [
          { id: "1", description: "add button" },
          { id: "2", description: "change color" },
          { id: "3", description: "change styles" },
          { id: "4", description: "add button" },
          { id: "5", description: "change color" },
          { id: "6", description: "change styles" },
          { id: "7", description: "add button" },
          { id: "8", description: "change color" },
          { id: "9", description: "change styles" },
        ],
      },
    ],
  },
];

interface State {
  boards: Board[];
  actions: Action[];
  selectedBoardId?: string;
}

const initialState: State = {
  boards: boards,
  selectedBoardId: "",
  actions: [],
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
      state.boards.push(payload);

      state.actions.push({
        id: uuid(),
        text: `Board ${payload.title} added`,
      });
    },
    deleteBoard(state, { payload }: PayloadAction<string>) {
      state.boards.splice(
        state.boards.findIndex((item) => item.id === payload),
        1
      );

      state.actions.push({ id: uuid(), text: `Board deleted` });
    },
    editBoard(state, { payload }) {
      const board = state.boards.find((board) => board.id === payload.id);
      if (!board) return;
      board.title = payload.boardTitle;

      state.actions.push({
        id: uuid(),
        text: `Board ${board.title} was updated to ${payload.boardTitle}`,
      });
    },
    addList(state, { payload }: PayloadAction<List>) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      if (!board) return;
      board.lists.push(payload);

      state.actions.push({
        id: uuid(),
        text: `List ${payload.title} was added to board ${board.title}`,
      });
    },
    deleteList(state, { payload }: PayloadAction<string>) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      board?.lists.splice(
        board.lists.findIndex((list) => list.id === payload),
        1
      );

      state.actions.push({
        id: uuid(),
        text: `List was deleted from ${board?.title}`,
      });
    },
    editList(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      if (!board) return;
      const list = board.lists.find((list) => list.id === payload.id);
      if (!list) return;
      list.title = payload.title;

      state.actions.push({
        id: uuid(),
        text: `List ${list.title} was updated to ${payload.title}`,
      });
    },
    addTask(state, { payload }) {
      const board = state.boards.find(
        (board) => board.id === state.selectedBoardId
      );
      const list = board?.lists.find((list) => list.id === payload.id);
      list?.tasks.push(payload.task);

      state.actions.push({
        id: uuid(),
        text: `Task ${payload.task.description} was added to board ${board?.title} and list ${list?.title}`,
      });
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

      state.actions.push({
        id: uuid(),
        text: `Task was deleted from board ${board?.title} and list ${list?.title}`,
      });
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

      state.actions.push({
        id: uuid(),
        text: `Task ${task.description} was updated to ${payload.description}`,
      });
    },
  },
});

export default boardSlice.reducer;
