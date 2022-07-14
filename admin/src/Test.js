import React from "react";
import { useNavigate } from "react-router-dom";
const Test = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>

      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>

      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <p>Hello world Test</p>
      <button
        onClick={() => {
          navigate("/admin");
        }}
        style={{ color: "red", backgroundColor: "green" }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Test;
