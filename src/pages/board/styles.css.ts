import { style } from "@vanilla-extract/css";

export const listContainer = style({
  padding: "20px",
  display: "flex",
  gap: "10px",
  overflowX: "auto",
  overflowY: "hidden",
  userSelect: "none",
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

export const icon = style({
  width: "24px",
  height: "24px",
});

export const container = style({
  display: "flex",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
});

export const listAddButton = style({
  padding: "12px 24px",
  display: "flex",
  width: "320px",
  flex: "0 0 auto",
  height: "50px",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #9fb2ff",
  borderRadius: "4px",
  backgroundColor: "#9fb2ff",
  ":hover": {
    cursor: "pointer",
    border: "1px solid #55564f",
  },
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
