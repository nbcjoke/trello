import { style } from "@vanilla-extract/css";

export const listContainer = style({
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

export const listWrapper = style({
  minWidth: "240px",
  boxSizing: "border-box",
  padding: "10px",
  background: "#d5d2d2",
  borderRadius: "4px",
});

export const title = style({
  margin: "0 0 10px",
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
