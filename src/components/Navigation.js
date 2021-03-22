import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "./img/logo_red.png"


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            width: 50


            
        }}
    />
);

//const imgSource = "./img/apopcorn.jpg"

function Navigation() {

    

    return (
    <div>


        <div className="nav">
            <Link to="/">&#60; Movies</Link>
            <Link to="/about">About</Link>
            <img className="img"
                        src={logo}
                        alt="profile" />
            <Link to="/Home2">Home</Link>
            <Link to="/Home2">Join us</Link>
        </div>


        <div>
            <p className="grade_title">Quick grade guide</p>
            <div className="grade">
            <p>violent1 : bleeding </p>
            <p>violent2 : physical fighting </p>
            <p>violent3 : kill, gore </p>
            
            <p>nudity1 : kiss </p>
            <p>nudity2 : nudity </p>
            <p>nudity3 : sex scene </p>
            </div>
            <Link to="/Home2">Detail</Link>
            
        </div>


        
        <div className="copyright">
            <p>copyright ©shootingcorn All rights reserve. </p>
        </div>
        


    </div>


    );
}
//<ColoredLine color="white" />
export default Navigation;