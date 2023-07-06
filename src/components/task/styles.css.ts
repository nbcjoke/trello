import { style } from "@vanilla-extract/css";

export const icon = style({
  width: "24px",
  height: "24px",
});

export const removeButton = style({
  padding: 0,
  marginTop: "5px",
  border: "none",
  background: "transparent",
});

export const taskCard = style({
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  background: "#fff",
  borderRadius: "4px",
  border: "1px solid #fff",
  transition: "0.3s",
  ":hover": {
    border: "1px solid #a39e9e",
  },
});
