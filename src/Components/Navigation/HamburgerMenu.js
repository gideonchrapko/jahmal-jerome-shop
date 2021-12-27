import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import Close from "../../Assets/Close.svg";
import Open from "../../Assets/Open.svg";
import './hamburgerMenu.css';

  export default function MenuRight() {
    const [rightMenuVisible, setRightMenuVisible] = useState(false);
    const rightMenuAnimation = useSpring({
      opacity: rightMenuVisible ? 1 : 0,
      transform: rightMenuVisible ? `translateX(0)` : `translateX(200%)`
    }); 

    return (
      <div style={{ position: "fixed", zIndex: "9999" }}>
        <img
        	alt="menu"
					className="menu-button"
					onClick={() => setRightMenuVisible(!rightMenuVisible)}
					src={rightMenuVisible ? Close : Open}
        />
        <animated.div style={rightMenuAnimation} className="menu menu--right">
          <nav style={{ paddingTop: "20px", paddingBottom: "20px" }}> 
                <li className="menu-list-item menu-list-item--right">
                  <Link to="/">
                    Court
                  </Link>
                </li>
                <li className="menu-list-item menu-list-item--right">
                  <Link to="/commissary">
                    Commissary  
                  </Link>
                </li>
                <li className="menu-list-item menu-list-item--right">
                  <Link to="/slot-time">
                    Slot Time 
                  </Link>
                </li>
                <li className="menu-list-item menu-list-item--right">
                  <Link to="/law-library">
                    Law Library 
                  </Link>
                </li>
          </nav> 
      </animated.div >
    </div>
    );
}