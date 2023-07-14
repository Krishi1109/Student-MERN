import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProctedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  let login = localStorage.getItem("login_token");
  useEffect(() => {
    if (!login) {
      new Promise((resolveOuter) => {
        resolveOuter(
          new Promise((resolveInner) => {
            setTimeout(resolveInner, 2000);
          })
        );
      });
      navigate("/login");
    } 
  });
  return (
    <div>
      <Component />
    </div>
  );  
};

export default ProctedRoute;
