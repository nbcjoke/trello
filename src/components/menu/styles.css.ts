import { style } from "@vanilla-extract/css";

export const menuContainer = style({
  position: "absolute",
  right: 0,
  top: "70px",
  borderLeft: "1px solid #999595",
  bottom: 0,
  width: 0,
  padding: "20px 10px",
  background: "#edeaea",
  zIndex: 1,
});

export const menuHeader = style({
  display: "flex",
  position: "relative",
  alignItems: "center",
  "::after": {
    position: "absolute",
    display: "block",
    top: "50px",
    left: 0,
    background: "#d5d2d2",
    content: "",
    width: "100%",
    height: "2px",
  },
});

export const menuTitle = style({
  margin: " 0 0 0 160px",
});

export const menuCloseButton = style({
  marginLeft: "auto",
  padding: "9px 18px",
  border: "1px solid #9fb2ff",
  background: "#9fb2ff",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "0.3s",
  ":hover": {
    border: "1px solid #55564f",
  },
});

export const activityContainer = style({});

export const activityTitle = style({
  marginTop: "40px",
});

export const userLogContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

export const userLogText = style({
  margin: 0,
  fontSize: "18px",
});
