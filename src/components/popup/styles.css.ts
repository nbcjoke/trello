import { style } from "@vanilla-extract/css";

export const popupContainer = style({
  width: "320px",
  height: "fit-content",
  flex: "0 0 auto",
  padding: "10px",
  boxSizing: "border-box",
  backgroundColor: "#d5d2d2",
  borderRadius: "4px",
});

export const input = style({
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  border: "1px solid #fff",
  borderRadius: "4px",
  backgroundColor: "#fff",
  ":focus": {
    border: "1px solid blue",
    outline: "none",
  },
});

export const buttonContainer = style({
  marginTop: "10px",
  display: "flex",
  gap: "10px",
});

export const button = style({
  padding: "12px 24px",
  backgroundColor: "#9fb2ff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#8299f8",
  },
});
