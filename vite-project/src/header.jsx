import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { faPlus, faBlog, faBell, faCommentAlt, faUserCircle, faSignOutAlt, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  
 
    const logout = () => {
       
        window.location.href = '/';
    }

    

    return (
        <div className="header">
            <div className="header__content">
                <div>
                    <Link to="/dashboard" className="header__title"><img src="/images/logo.png" alt="" /><h1 >Ocassionly</h1></Link>
                </div>
                <div className="header__links">
                    <input type="checkbox" id="toggler" />
                    <div id="hamburger">
                        <div></div>
                    </div>
                    <div id="desktop-menu">
                        <div>
                            <div>
                                <ul id="menuToggle">
                                    <Link to="../add"><button className="scale"><FontAwesomeIcon icon={faPlus}/></button></Link>
                                    <div className="button-dropdown">
                                        <button className="button-dropbtn"><FontAwesomeIcon icon={faUserCircle} size="lg" /></button>
                                        <div className="button-dropdown__content">
                                            <div><button className="button-logout">ansh</button></div>
                                            <div><button onClick={logout} className="button-logout">Logout</button></div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="menu">
                        <div>
                            <div>
                                <ul>
                                    <Link to="../../me"><button className="button-logout"></button></Link>
                                    <button onClick={logout} className="button-logout">Logout<FontAwesomeIcon icon={faSignOutAlt} /></button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
