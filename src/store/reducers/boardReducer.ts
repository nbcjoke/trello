import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Board } from "../../types/board";

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
}

const initialState: State = {
  boards: boards,
  errors: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    createBoardAction(state, { payload }: PayloadAction<Board>) {
      state.boards.push(payload);
    },
    deleteBoard(state, { payload }: PayloadAction<string>) {
      state.boards.splice(
        state.boards.findIndex((item) => item.id === payload),
        1
      );
    },
  },
});

export default boardSlice.reducer;
