import React, { useEffect } from "react";
import img from "../Images/form.png";
import axios from "axios";

const Home = () => {

  const ccliickanndler = () => {
    axios.get('http://localhost:5000/',{ withCredentials: true }).then((response) => {
      console.log("response :", response);
    }).catch((err) => {
      console.log("err :", err);
    })
  }

  return <div className="p-5 m-5" >
    <h1 className="text-primary">Welcome To BONZARK TECHNOLOGIES</h1>
    <img alt="" src={img}/>
  </div>;
};

export default Home;
