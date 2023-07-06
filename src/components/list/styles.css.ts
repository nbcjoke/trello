import { style } from "@vanilla-extract/css";

export const listWrapper = style({
  position: "relative",
  overflow: "auto",
  height: "fit-content",
  maxHeight: "100%",
  width: "320px",
  flex: "0 0 auto",
  boxSizing: "border-box",
  padding: "10px",
  background: "#d5d2d2",
  borderRadius: "4px",
  "::-webkit-scrollbar": {
    position: "fixed",
    top: 0,
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgrey",
    outline: "1px solid slategrey",
  },
  "::-webkit-scrollbar-button": {
    display: "none",
  },
});

export const titleWrapper = style({
  height: "50px",
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

export const taskWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
});

export const addTaskWrapper = style({
  marginTop: "10px",
  height: "40px",
  display: "flex",
  gap: "7px",
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

export const icon = style({
  width: "24px",
  height: "24px",
});

export const saveButton = style({
  padding: "12px 24px",
  border: "1px solid #9fb2ff",
  backgroundColor: "#9fb2ff",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    border: "1px solid #55564f",
  },
});

export const input = style({
  padding: "10px 12px",
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

export const editListTitleClass = style({
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "7px",
});
