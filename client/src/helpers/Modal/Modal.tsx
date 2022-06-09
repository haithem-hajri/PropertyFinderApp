import React from "react";
const MODAL_STYLES: object = {
  position: "absolute",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: "5000000000000",
  width: "80%",
  borderRadius: ".5em",
};
const OVERLAY_STYLE: object = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .8)",
  zIndex: "5000000000001",
  overflowY: "auto",
};
const Modal = ({ open, children }: any) => {
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLE}>
        <div style={MODAL_STYLES}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
