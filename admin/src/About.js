import React from 'react'
import { useNavigate } from "react-router-dom";
const 
About = () => {
  const navigate = useNavigate();
  return (
    <div>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
    <p>Hello world about me</p>
     <p>Hello world about me</p>
     <p>Hello world about me</p>
     <p>Hello world about me</p>

     <p>Hello world about me</p>
     <p>Hello world about me</p>
     <p>Hello world about me</p>
     <p>Hello world about me</p>

     <p>Hello world about me</p>
     <p>Hello world about me</p>
     <button
        onClick={() => {
          navigate("/admin");
        }}
        style={{ color: "red", backgroundColor: "green" }}
      >
        Go to Home
      </button>
    </div>
  )
}

export default 
About