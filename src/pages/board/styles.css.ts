import { style } from "@vanilla-extract/css";

export const listContainer = style({
  padding: "20px",
  display: "flex",
  gap: "10px",
});

export const boardTitleContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const boardEditButton = style({
  cursor: "pointer",
});

export const listWrapper = style({
  height: "100%",
  width: "100%",
  maxWidth: "300px",
  flex: 1,
  boxSizing: "border-box",
  padding: "10px",
  background: "#d5d2d2",
  borderRadius: "4px",
});

export const titleWrapper = style({
  display: "flex",
});

export const title = style({
  margin: "0 0 10px",
});

export const buttonsWrapper = style({
  display: "flex",
  marginLeft: "auto",
  gap: "5px",
  cursor: "pointer",
});

export const icon = style({
  width: "24px",
  height: "24px",
});

export const taskWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
});

export const taskCard = style({
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  background: "#fff",
  borderRadius: "4px",
});

export const addTaskWrapper = style({
  marginRight: "auto",
});

export const addTaskButton = style({
  padding: "6px 12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  fontSize: "18px",
  border: "none",
  borderRadius: "4px",
  background: "transparent",
  ":hover": {
    cursor: "pointer",
  },
});

export const input = style({
  padding: "12px",
  border: "1px solid #fff",
  borderRadius: "4px",
  backgroundColor: "#fff",
  ":focus": {
    border: "1px solid blue",
    outline: "none",
  },
  ":hover": {
    border: "1px solid blue",
    outline: "none",
  },
});

export const saveButton = style({
  padding: "12px 24px",
  backgroundColor: "#9fb2ff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export const taskCardDelete = style({
  marginTop: "5px",
});

export const listAddButton = style({
  padding: "12px 24px",
  display: "flex",
  width: "100%",
  maxWidth: "300px",
  flex: 1,
  height: "50px",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#9fb2ff",
  ":hover": {
    cursor: "pointer",
  },
});
