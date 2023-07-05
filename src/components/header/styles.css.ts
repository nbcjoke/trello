import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  boxSizing: "border-box",
  height: "70px",
  padding: "10px 70px",
  background: "#678dd6",
  justifyContent: "center",
  alignItems: "center",
});

export const link = style({
  fontSize: "28px",
  color: "black",
  transition: "0.15s",
});
