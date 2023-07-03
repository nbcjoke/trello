import { style } from "@vanilla-extract/css";

export const title = style({
  textAlign: "center",
});

export const description = style({
  textAlign: "center",
  fontSize: "24px",
});

export const createBoardForm = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "15px",
});

export const createInput = style({
  padding: "12px 24px",
  border: "1px solid #9fb2ff",
  borderRadius: "4px",
  backgroundColor: "#9fb2ff",
  ":focus": {
    border: "1px solid blue",
    outline: "none",
  },
});

export const createButton = style({
  padding: "12px 24px",
  borderRadius: "5px",
  border: "1px solid transparent",
  transition: "0.3s",
  ":hover": {
    border: "1px solid black",
    cursor: "pointer",
  },
});

export const boardContainer = style({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const boardTitle = style({
  marginTop: "30px",
  textAlign: "center",
  fontSize: "24px",
});
