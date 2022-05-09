import React from 'react'
import "./topbar.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context"


export default function TopBar(){
   const {user,dispatch} = useContext(Context);
   const PF = "https://blog-webapp-server.herokuapp.com/images/"
   const handleLogout=()=>{
     dispatch({type:"LOGOUT"});

   }
  return (
    <div className="top">
     <div className="topLeft">
       <i className="topIcon fab fa-facebook-square"></i>
       <i className="topIcon fab fa-instagram-square"></i>
       <i className="topIcon fab fa-pinterest-square"></i>
       <i className="topIcon fab fa-twitter-square"></i>
     </div>
     <div className="topCenter">
        <ul className="topList">
          <li className = "topListItems"> <Link className="link" to="/">
              HOME
            </Link></li>
          <li className = "topListItems">ABOUT </li>
          <li className = "topListItems">CONTACT </li>
          <li className = "topListItems"><Link className="link" to="/write">
              WRITE
            </Link> </li>
          <li className = "topListItems">{user && <li className="topListItem"onClick = {handleLogout}>LOGOUT</li>} </li>

        </ul>
     </div>
     <div className="topRight">

     {user ? (
       <Link className="link" to="/settings">
        <img
          className="topImg"
          src={PF+user.profilePic}
          alt=""
          />
        </Link>
      ) : (
      <ul className="topList">
        <li className="topListItems">
          <Link className="link" to="/login">
              LOGIN
          </Link>
        </li>
        <li className="topListItems">
          <Link className="link" to="/register">
              REGISTER
          </Link>
        </li>
      </ul>
   )}
   <i className="topSearchIcon fas fa-search"></i>
  </div>

   </div>
  )
}
