import { style } from "@vanilla-extract/css";

export const boardItem = style({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
  width: "120px",
  padding: "20px",
  background: "#eee",
  borderRadius: "4px",
  color: "black",
  fontSize: "20px",
  ":hover": {
    boxShadow: "rgba(255, 255, 255, 0.2) 0px 7px 29px 0px",
    cursor: "pointer",
  },
});

export const iconWrapper = style({
  position: "absolute",
  top: "10px",
  right: "10px",
});

export const iconButton = style({
  border: "none",
  ":hover": {
    cursor: "pointer",
  },
});

export const icon = style({
  width: "24px",
  height: "24px",
});
