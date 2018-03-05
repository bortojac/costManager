import React from 'react';
import './header.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/fontawesome-free-regular';



class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
            <a  onClick={this.props.openModal}><FontAwesomeIcon icon={faUserCircle} size="2x"/></a>
                <h1>Cost Manager</h1>
                {//<i className="fa fa-2x fa-user-circle"></i>
                }
            </div>
        )
    }
}

export default Header;