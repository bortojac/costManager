import React from 'react';
import './header.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';
import { Link } from 'react-router-dom';
import {login, logout, isLoggedIn } from '../../authActions';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
             {
             (isLoggedIn()) ? ( <a onClick={() => logout()}>Log Out</a> ) : ( <a  onClick={() => login()}>Log In</a> )
           }
             {//<Link to="/login"><FontAwesomeIcon icon={faUserCircle} size="2x"/></Link>
             }
                <h1>Cost Manager</h1>
            </div>
        );
    }
}

export default Header;