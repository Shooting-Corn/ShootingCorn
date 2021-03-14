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

        <div className="nav">

            <Link to="/">&#60; Movies</Link>
            <Link to="/about">About</Link>
            <img className="img"
                        src={logo}
                        alt="profile" />
            <Link to="/Home2">Home</Link>
            <Link to="/Home2">Join us</Link>
            


        </div>


    );
}
//<ColoredLine color="white" />
export default Navigation;