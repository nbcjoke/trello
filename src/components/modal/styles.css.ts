import { style } from "@vanilla-extract/css";

export const modalContainer = style({
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: "100vw",
  height: "100vh",
  zIndex: 0,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const centred = style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const modal = style({
  width: "450px",
  height: "200px",
  background: "#ece9e9",
  zIndex: 10,
  borderRadius: "8px",
  boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "center",
  padding: "10px",
});

export const form = style({
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "10px",
});

export const closeButton = style({
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

export const button = style({
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
