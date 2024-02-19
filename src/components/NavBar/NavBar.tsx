
import React from 'react';
import scbLogo from '../../assets/scb-logo.png';

import './NavBar.css';

const NavBar = () => {
    return(
        <div>
            <header className="header">
                <div className="headerContainer">
                    
                        <img src={scbLogo} alt="SCB Logo" aria-label="SCB logo" height="80px" width="150px" />
                    
                </div>
            </header>
            
        </div>
    );
};

export default NavBar;